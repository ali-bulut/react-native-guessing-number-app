import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const generateRandomBetween = (min,max,exclude) => {
    //just in case we did it.
    //for exm 1.4 -> 2
    min=Math.ceil(min);
    //for exm 1.6 -> 1
    max=Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if(rndNum === exclude){
        return generateRandomBetween(min,max,exclude);
    } else{ 
        return rndNum;
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    //if the component rerenders, react recognize these variables' last values.
    //so when the component rerenders currentLow will not be 1 and also currentHigh will not be 100
    const currentLow = useRef(1);
    const currentHigh = useRef(100);


    const nextGuessHandler = (direction) => {
        //Validation operations
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Don\'t lie!', 'You know that this is wrong :)', [{text:'Sorry!', style:'cancel'}]);
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess;
        }
        else if(direction === 'greater'){
            currentLow.current = currentGuess;
        }else{
            return;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={() => nextGuessHandler('lower')} />
                <Button title="Greater" onPress={() => nextGuessHandler('greater')} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
});

export default GameScreen;