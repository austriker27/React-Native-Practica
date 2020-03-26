// default custom component template:: 
// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const StartGameScreen = props => {};

// const styles = StyleSheet.create({});

// export default StartGameScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setbuttonWidth] = useState(Dimensions.get('window') / 4);




    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    useEffect(() => {
        const updateLayout = () => {
            setbuttonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)
        // return is clean up function, runs right before useEffect
        return () => {
            // remove event listener every time component reloads so there's not a gazillion of them
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

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
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>START A NEW GAME</TitleText>
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
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
 };

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        // width: 100,
        // width: Dimensions.get('window').width / 4
    },
    input: {
        width: 75,
        textAlign: 'center',
        justifyContent: 'center',
    },
    summaryContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    }
});

export default StartGameScreen;