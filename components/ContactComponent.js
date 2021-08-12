import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    }

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['newtoncamprealty@newreal.com'],
            subject: 'Inquiry',
            body: 'Dear Sir/Madam: '
        })
    }

    render () {
        return ( 
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Card title="Contact Information" wrapperStyle={{margin: 20}}>
                        <Text>555 Nureal Ave</Text>
                        <Text>Lansdale, Pa 19446</Text>
                        <Text style={styles.bottom}>USA</Text>
                        <Text></Text>
                        <Text>Phone: 1(267) 555-7890</Text>
                        <Text>Email: newtoncamprealty@newreal.com</Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "steelblue" , margin: 40}}
                            icon={<Icon
                                name='envelope-o'
                                type='font-awesome'
                                color='#fff'
                                iconStyle={{marginRight: 10}}
                            />}
                            onPress={() => this.sendMail()}
                        />  
                    </Card>
                </Animatable.View>        
            </ScrollView>
        )
    }    
}

const styles=StyleSheet.create ({
    bottom: {
        marginBottom: 10,
    }
})

export default Contact;