import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

// same syntax as below as a functional component:
// function GoalInput() {}

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="" 
                style={styles.inputContainer} 
                onChangeText={goalInputHandler}
                value={enteredGoal}
            />
            <Button style={styles.button} title="ADD" onPress={props.onAddGoal.bind(this, enteredGoal)} />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        color: '#FF1690',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainer: {
        borderColor: '#FF1690', 
        color: '#FF1690',
        borderWidth: 1, 
        padding: 10, 
        width: '80%',
    },  
    button: {
        backgroundColor: '#36CDC4',
        color: '#FF1690',
    },
    
})

export default GoalInput;