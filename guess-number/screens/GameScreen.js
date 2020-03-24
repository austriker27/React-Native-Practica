import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    // recursion if number returns picked number
    if(rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, props.userChoice)
    );

    // manage how many rounds have ran
    const [rounds, setRounds] = useState(0);

    // useRef maintains even after component rebuild
    // if state changes then the component rerenders, but with useRef, when it changes, the component doesnt rerender. we dont want a rerender when these change
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // destructure object, pulling property names out of props - so you dont have to say props.userChoice
    const { userChoice, onGameOver } = props;

    // useEffect : runs after each render cycle
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(rounds);
        }
        // second argument: specify any value outside that if changed will trigger rerender
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'great' && currentGuess > props.userChoice))
            {
                Alert.alert('Don\'t lie!', 'You now that this is wrong', [
                    { text: 'Sorry!', style: 'cancel' }
                ])
                return;
        }
        // if give correct hint, then generate new number
        if (direction === 'lower'){
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        // component rerendered and next guess:
        setCurrentGuess(nextNumber);
        // add to rounds
        setRounds(curRounds => curRounds + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%',
    }
});

export default GameScreen;