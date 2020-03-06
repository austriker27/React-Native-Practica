import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';


export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);

    const addGoalHandler = goalTItle => {
        // setCourseGoals([...courseGoals, enteredGoal]);
        // above syntax works but so does this: 
        setCourseGoals(currentGoals => [...currentGoals, { key: Math.random().toString(), value: goalTItle}]);
    };

    const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals => {
            return currentGoals.filter((goal) => goal.id !== goalId)
        })
    }

    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.title}>Todo List Thingy</Text>
            </View>

            <GoalInput onAddGoal={addGoalHandler} />
            
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
