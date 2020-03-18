import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';


export default function App() {
    const [userNumber, setUserNumber] = useState();

    // selectedNumber comes up from the StartGameScreen via click on start game button tht has a function on press to pass selectedNumber via onStartGame function
    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    }

    // forward pointer/reference to the startGameHandler down to StartGameScreen component
    let content = <StartGameScreen onStartGame={startGameHandler} />;

    // render GameScreen only after you get a userNumber, managed in state, when user picks num
    if(userNumber) {
        // pass the selected number to the GameScreen
        content = <GameScreen userChoice={userNumber}/>
    }

    return (
        <View style={styles.screen}>
            <Header title="Heyooo, guess a number"/>
            {content}
            
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
