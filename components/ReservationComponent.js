import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet,Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from "react-native-animatable";
import * as Notifications from 'expo-notifications';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            virtualTour: false,
            date: new Date(),
            showCalendar: false
        };
    }

    static navigationOptions = {
        title: 'Reserve House Tour'
    }

    handleReservation() {
        console.log(JSON.stringify(this.state));
        Alert.alert(
            'Search',
            `Virtual Tour?: ${this.state.virtualTour} \nDate: ${this.state.date}\n`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date.toLocaleDateString('en-US'));
                        this.resetForm();
                    }
                }    
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            virtualTour: false,
            date: new Date(),
            showCalendar: false,
        });
    }

    async presentLocalNotification(date) {
        function sendNotification() {
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowAlert: true
                })
            });

            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Your Home Tour Reservation Search',
                    body: `Search for ${date} requested`
                },
                trigger: null
            });
        }

        let permissions = await Notifications.getPermissionsAsync();
        if (!permissions.granted) {
            permissions = await Notifications.requestPermissionsAsync();
        }
        if (permissions.granted) {
            sendNotification();
        }
    }

    render() {
        return (
            <Animatable.View animation="fadeIn" duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Prefer Virtual Tour?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.virtualTour}
                            trackColor={{true: 'darkblue', false: null}}
                            onValueChange={value => this.setState({virtualTour: value})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Best Date For You?</Text>
                        <Button
                            onPress={() =>
                                this.setState({showCalendar: !this.state.showCalendar})
                            }
                            title={this.state.date.toLocaleDateString('en-US')}
                            color='darkblue'
                            accessibilityLabel='Tap me to select a reservation date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({date: selectedDate, showCalendar: false});
                            }}
                            style={styles.formItem}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.handleReservation()}
                            title='Search'
                            color='steelblue'
                            accessibilityLabel='Tap me to search for available house tours to reserve'
                        />
                    </View>
                </ScrollView>
            </Animatable.View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
});

export default Reservation;