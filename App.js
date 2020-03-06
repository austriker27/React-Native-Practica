import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
    const [enteredGoal, setEnteredGoal] = useState('');
    const [courseGoals, setCourseGoals] = useState([]);

    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const addGoalHandler = () => {
        // setCourseGoals([...courseGoals, enteredGoal]);
        // above syntax works but so does this: 
        setCourseGoals(currentGoals => [...currentGoals, {key: Math.random().toString(), value: enteredGoal}]);
    };

    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.title}>Todo List Thingy</Text>
            </View>
            <View style={styles.container}>
                <TextInput 
                    placeholder="" 
                    style={styles.inputContainer} 
                    onChangeText={goalInputHandler}
                    value={enteredGoal}
                />
                <Button style={styles.button} title="ADD" onPress={addGoalHandler} />
            </View>
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={courseGoals} 
                renderItem={itemData => (
                <View style={styles.listItem}>
                    <Text>{itemData.item.value}</Text>
                </View>
            )} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 50,
        backgroundColor: '#1C0658',
        height: '100%',
    },
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
    title: {
        color: '#FF1690',
    },
    listItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ffff',
        borderColor: '#FF1690',
        borderWidth: 1,

    }
});
