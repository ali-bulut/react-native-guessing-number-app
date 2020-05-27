import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
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

const renderListItem = (value, numOfRound) => {
    return <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRound}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
}

const GameScreen = (props) => {

    //normally we set the orientation position on app.json but with the help of expo we can change it when the app's running
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);


    const [availabledeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availabledeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    })

    //if the component rerenders, react recognize these variables' last values.
    //so when the component rerenders currentLow will not be 1 and also currentHigh will not be 100
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    //it will work only when the values(currentGuess, props.userChoice, props.onGameOver) change.
    useEffect(()=>{
        if(currentGuess === props.userChoice){
            props.onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }else{
            return;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPassGuesses => [nextNumber ,...curPassGuesses])
    }

    if(availabledeviceHeight < 500){
        return (<View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={{flexDirection:'row', justifyContent:'space-around', width:'80%', alignItems:'center'}}>
        <MainButton onPress={() => nextGuessHandler('lower')}> <Ionicons name="md-arrow-down" size={24} color="white" /> </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={() => nextGuessHandler('greater')}> <Ionicons name="md-arrow-up" size={24} color="white" /> </MainButton>
        </View>
        <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index) =>  renderListItem(guess, pastGuesses.length - index))}
        </ScrollView>
        </View>
    </View>)
    }

    return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')} > <Ionicons name="md-arrow-down" size={24} color="white" /> </MainButton>
                <MainButton onPress={() => nextGuessHandler('greater')} > <Ionicons name="md-arrow-up" size={24} color="white" /> </MainButton>
            </Card>
            <View style={styles.listContainer}>
            <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) =>  renderListItem(guess, pastGuesses.length - index))}
            </ScrollView>
            </View>
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
        marginTop:Dimensions.get('window').height > 600 ? 20 : 5,
        width:400,
        maxWidth:'90%'
    },
    listContainer:{
        //we should write this for android to scroll
        flex:1,
        width: '80%'
    },
    list:{
        //generally uses for scrollview for more flexibility. There is not much differrence between flex:1
        flexGrow:1,
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    listItem:{
        borderColor:'#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'60%'
    }
});

export default GameScreen;