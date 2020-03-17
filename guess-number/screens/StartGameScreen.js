// default custom component template:: 
// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const StartGameScreen = props => {};

// const styles = StyleSheet.create({});

// export default StartGameScreen;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                Start a new game
            </Text>
            <Card style={styles.inputContainer}>
                <Text>
                    Select a number
                </Text>
                <Input/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={() => { }} color={Colors.secondary}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Confirm" onPress={() => { }} color={Colors.primary}/>
                    </View>
                </View>
            </Card>
        </View>
    )
 };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        width: 100,
    }
});

export default StartGameScreen;