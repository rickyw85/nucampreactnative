import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        houses: state.houses,
        newton: state.newton,
        vendors: state.vendors
    };
};

function RenderItem(props) {
    const {item} = props;

    if (props.isLoading) {
        return <Loading />;
    }
    if (props.errMess) {
        return (
            <View>
                <Text>{props.errMess}</Text>
            </View>
        );
    }
    if (item) {
        return (
            <Card
                featuredTitle={item.name}
                image={{uri: baseUrl + item.image}}>
                <Text style={{ margin: 10}}>
                    {item.description}
                </Text>
            </Card>
        );
    }
    return <View />;
}

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scaleValue: new Animated.Value(0)
        };
    }

    animate() {
        Animated.timing(
            this.state.scaleValue,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }
        ).start();
    }

    componentDidMount() {
        this.animate();
    }

    static navigationOptions = {
        title: 'Home'
    }

    render() {
        return (
            <Animated.ScrollView style={{transform: [{scale: this.state.scaleValue}]}}>
                <RenderItem
                    item={this.props.newton.newton.filter(newt => newt.featured)[0]}
                    isLoading={this.props.newton.isLoading}
                    errMess={this.props.newton.errMess}
                />
                <RenderItem
                    item={this.props.houses.houses.filter(house => house.featured)[0]}
                    isLoading={this.props.houses.isLoading}
                    errMess={this.props.houses.errMess}
                />
                <RenderItem
                    item={this.props.vendors.vendors.filter(vendor => vendor.featured)[0]}
                    isLoading={this.props.vendors.isLoading}
                    errMess={this.props.vendors.errMess}
                />
            </Animated.ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);