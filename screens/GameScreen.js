import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

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
    const [rounds, setRounds] = useState(0);

    //if the component rerenders, react recognize these variables' last values.
    //so when the component rerenders currentLow will not be 1 and also currentHigh will not be 100
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //it will work only when the values(currentGuess, props.userChoice, props.onGameOver) change.
    useEffect(()=>{
        if(currentGuess === props.userChoice){
            props.onGameOver(rounds);
        }
    }, [currentGuess, props.userChoice, props.onGameOver])

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
        setRounds(curRounds => curRounds + 1)
    }

    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')} > <Ionicons name="md-arrow-down" size={24} color="white" /> </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')} > <Ionicons name="md-arrow-up" size={24} color="white" /> </MainButton>
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
        width:400,
        maxWidth:'90%'
    }
});

export default GameScreen;