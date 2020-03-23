// default custom component template:: 
// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const StartGameScreen = props => {};

// const styles = StyleSheet.create({});

// export default StartGameScreen;

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';

import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue); // convert string to number
        // if number is not a number or less than zero or less than 99, return without saving
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                    'Invalid number', 
                    'Number has to be a number between 1 and 99', 
                    [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
                );
            return;
        }
        setConfirmed(true);
        // save entered value
        setSelectedNumber(chosenNumber);
        // reset entered value which happens on next component re-render
        setEnteredValue('');
        // hide keyboard
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>START A NEW GAME</Text>
                <Card style={styles.inputContainer}>
                    <BodyText style={styles.text}>Select a number</BodyText>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit autoCapitalize="none" 
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
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
        fontFamily: 'lazer84',
        fontWeight: "700"
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        width: 100,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    }
});

export default StartGameScreen;