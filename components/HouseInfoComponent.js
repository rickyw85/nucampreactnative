import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, StyleSheet, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Input, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postReview } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        reviews: state.reviews,
        favorites: state.favorites
    };
};

const mapDispatchToProps = {
    postFavorite: houseId => (postFavorite(houseId)),
    postReview:(houseId, rating, author, text) => (postReview(houseId, rating, author, text))
};

function RenderHouse(props) {

    const {house} = props;

    const view = React.createRef();

    const recognizeDrag = ({dx}) => (dx < -200) ? true : false;
    const recognizeReview = ({dx}) => (dx > -200) ? true : false;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            view.current.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'canceled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + house.name + ' to favorites?',
                    [
                        {
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => console.log('Cancel Pressed')
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ?
                                console.log('Already set as a favorite') : props.markFavorite()
                        }
                    ],
                    { cancelable: false }
                );
            } else if (recognizeReview (gestureState)) {
                props.onShowModal();
            }
            return true;
        }
    });

    const shareHouse = (title, message, url) => {
        Share.share({
            title: title,
            message: `${title}: ${message} ${url}`,
            url: url
        },{
            dialogTitle: 'Share ' + title
        });
    };

    if (house) {
        return (
            <Animatable.View
                animation='fadeIn'
                duration={3000}
                delay={1000}
                ref={view}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={house.name}
                    image={{uri: baseUrl + house.image}}
                    >
                    <Text style={{margin: 10}}>
                        {house.description}
                    </Text>
                    <View style={styles.cardRow}>
                        <Icon
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='darkred'
                            raised
                            reverse
                            onPress={() => props.favorite ? 
                                console.log('Already set as a favorite') 
                                : props.markFavorite()
                            }
                        />
                        <Icon
                            name={'pencil'}
                            type='font-awesome'
                            color='darkblue'
                            raised
                            reverse
                            onPress={() => props.onShowModal()}
                        />
                        <Icon
                            name={'share'}
                            type='font-awesome'
                            color='gold'
                            raised
                            reverse
                            onPress={() => shareHouse(house.name, house.description, baseUrl + house.image)} 
                        />
                    </View>        
                </Card>
            </Animatable.View>    
        );
    }
    return <View />;
}

function RenderReviews({reviews}) {

    const renderReviewItem = ({item}) => {
        return (
            <View style={{margin: 10}}>
                <Text style={{fontSize: 23}}>{item.text}</Text>
                <Rating startingValue={item.rating} imageSize={10} readonly style={{alignItems: 'flex-start', paddingVertical: '5%'}} />
                <Text style={{fontSize: 17}}>{`-- ${item.author}, ${item.date}`}</Text>
            </View>
        );
    };

    return (
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='Reviews'>
                <FlatList
                    data={reviews}
                    renderItem={renderReviewItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>    
    );
}

class HouseInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: 5,
            author: "",
            text: ""
        };    
    }

    markFavorite(houseId) {
        this.props.postFavorite(houseId);
    }

    static navigationOptions = {
        title: 'Listing Info'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReview(houseId) {
        this.props.postReview(houseId, this.state.rating, this.state.author, this.state.text);
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: 5,
            author: "",
            text: "",
            showModal: false
        });
    }

    render() {
        const houseId = this.props.navigation.getParam('houseId');
        const house = this.props.houses.houses.filter(house => house.id === houseId)[0];
        const reviews = this.props.reviews.reviews.filter(review => review.houseId === houseId);
        return (
            <ScrollView>
                <RenderHouse 
                    house={house}
                    favorite={this.props.favorites.includes(houseId)}
                    markFavorite={() => this.markFavorite(houseId)}
                    onShowModal={() => this.toggleModal()}
                />
                <RenderReviews reviews={reviews} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Rating
                            imageSize={40}
                            showRating
                            startingValue={this.state.rating}
                            style={{ paddingVertical: 10 }}
                            onFinishRating={(rating) => this.setState({ rating: rating })}
                        />
                        <Input
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        leftIconContainerStyle={{ paddingRight: 10}}
                        onChangeText={(author) => this.setState({ author: author })}
                        />
                        <Input
                        placeholder='Review'
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        leftIconContainerStyle={{ paddingRight: 10}}
                        onChangeText={(review) => this.setState({ author: review })}
                        />    
                        <View style={{ margin: 10 }}>
                            <Button
                                title='Submit'
                                color='darkblue'
                                onPress={() => {
                                    this.toggleModal();
                                    this.resetForm();
                                }} 
                            />
                        </View>
                        
                        <View style={{margin: 10}}>
                            <Button
                                onPress={() => {
                                    this.handleReview();
                                    this.resetForm();
                                    }}
                                color='darkblue'
                                title='Cancel'
                            />
                        </View>    
                    </View>    
                </Modal>
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create ({
    cardRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    modal: { 
        justifyContent: 'center',
        margin: 20
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(HouseInfo);