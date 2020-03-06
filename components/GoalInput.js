import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

// same syntax as below as a functional component:
// function GoalInput() {}

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('');

    const goalInputHandler = (enteredText) => {
        console.log('enteredText:' + enteredText)
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        props.onAddGoal.bind(enteredGoal);
        console.log(enteredGoal)
        setEnteredGoal('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <TextInput 
                    placeholder="Hello" 
                    style={styles.input} 
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button color="red" title="cancel" onPress={props.onCancel} />
                    </View>
                    <View style={styles.buttonCancel}>
                        <Button color="blue" title="ADD" onPress={addGoalHandler} />
                    </View>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '75%',
    },
    button: {
        backgroundColor: '#36CDC4',
        color: '#FF1690',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonCancel: {
        backgroundColor: '#ffffff',
        color: 'red',
        flex: 1,
        marginHorizontal: 5,
    },
    
})

export default GoalInput;