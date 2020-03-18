import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

    // begin new game
    const configureNewGamehandler = () => {
        // reset guess rounds to zero and reset userNumber, the 2 things checked in the below IF
        setGuessRounds(0);
        setUserNumber(null);
    }

    // selectedNumber comes up from the StartGameScreen via click on start game button tht has a function on press to pass selectedNumber via onStartGame function
    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);

    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds)
    }

    // forward pointer/reference to the startGameHandler down to StartGameScreen component
    let content = <StartGameScreen onStartGame={startGameHandler} />;

    // render GameScreen only after you get a userNumber, managed in state, when user picks num
    // show game over screen
    if(userNumber && guessRounds <= 0) {
        // pass the selected number to the GameScreen
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    // game is over 
    } else if (guessRounds > 0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGamehandler}/>
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
