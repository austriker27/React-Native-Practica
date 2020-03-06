import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

// same syntax as below as a functional component:
// function GoalInput() {}

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal.bind(enteredGoal)
        setEnteredGoal('');
    }

    return (
        <Modal visible={props.visible} animationType="fade">
            <View style={styles.container}>
                <TextInput 
                    placeholder="" 
                    style={styles.input} 
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <Button style={styles.buttonCancel} title="cancel" onPress={props.onCancel} />
                <Button style={styles.button} title="ADD" onPress={addGoalHandler} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        color: '#FF1690',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        borderColor: '#FF1690', 
        color: '#FF1690',
        borderWidth: 1, 
        padding: 10, 
        width: '80%',
        marginBottom: 10,
    },  
    button: {
        backgroundColor: '#36CDC4',
        color: '#FF1690',
    },
    buttonCancel: {
        backgroundColor: '#ffffff',
        color: 'red',
    },
    
})

export default GoalInput;