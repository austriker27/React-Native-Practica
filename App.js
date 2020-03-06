import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
    // useState(false) is the initial state so false 
    // in const array: first word is the state, second word is how to change the state
    const [courseGoals, setCourseGoals] = useState([]);
    const [isAddMode, setIsAddMode] = useState(false);


    const addGoalHandler = goalTitle => {
        // setCourseGoals([...courseGoals, enteredGoal]);
        // above syntax works but so does this: 
        console.log('inside add goal handler')
        setCourseGoals(currentGoals => [
            ...currentGoals, 
            { 
                id: Math.random().toString(), 
                value: goalTitle 
            }
        ]);
        setIsAddMode(false);
    };

    // removes the goal that matches the ID, deleting fro mlist
    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter(goal => goal.id !== goalId)
        })
    }

    // cancels the modal that pops up to add goal
    const cancelGoalAdditionHandler  = () => {
        setIsAddMode(false);
    }

    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.title}>Todo List Thingy</Text>
            </View>

            <Button 
                title="Add 
                new goal" 
                onPress={() => setIsAddMode(true)}
            />

            <GoalInput
                visible={isAddMode}
                onAddGoal={addGoalHandler}
                onCancel={cancelGoalAdditionHandler} 
            />
            
            <FlatList 
                keyExtractor={(item, index) => item.id}
                data={courseGoals} 
                renderItem={itemData => (
                    <GoalItem 
                        id={itemData.item.id} 
                        onDelete={removeGoalHandler} 
                        title={itemData.item.value}
                    />
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
    title: {
        color: '#FF1690',
    },
});
