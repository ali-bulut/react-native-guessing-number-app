import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView} from 'react-native';

import Colors from '../constants/colors';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);


    

    useEffect(() => {
        //we use this because normally dimensions calculate only once. So when the position is reverse portrait to
    //landscape we should re-edit this.
    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4)
    }
    Dimensions.addEventListener('change', updateLayout);

    //it runs before useEffect runs!
    return () => {
        Dimensions.removeEventListener('change', updateLayout);
    }
    })

    const numberInputHandler = (inputText) => {
        //we replace the text to nothing except numbers
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid Number!', 'The entered number has to be a number which is between 1 and 99.', [{text:'Okay', style:'destructive', onPress:resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <BodyText>You selected</BodyText>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start The Game</MainButton>
        </Card>
    }

    return (
        <ScrollView>
            {/* we should use this inside of the scrollview */}
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        {/* when we click the screen the keyboard will be closed automatically */}
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
                <BodyText style={styles.text}>Select a Number</BodyText>
                <Input onSubmitEditing={confirmInputHandler} onChangeText={numberInputHandler} value={enteredValue} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} style={styles.input} />
                <View style={styles.buttonContainer}>
                    <View style={{width: buttonWidth}}><Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} /></View>
                    <View style={{width: buttonWidth}}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                </View>
            </Card>
            {confirmedOutput}
        </View>     
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center"
    },
    title:{
        //it comes from the definition which is applied on App.js file.
        fontFamily:'open-sans-bold',
        fontSize:20,
        marginVertical: 10
    },
    inputContainer:{
        width:'80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems:'center'
    },
    buttonContainer:{
        //default is column but we use row in order to want that buttons are next each other
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    // button:{
    //     // width: 100
    //     //there are 2 options. Screen and window. It doesnt matter on IOS. But on Android when we use window,
    //     //status bar height will be excluded from the calculation. So window is better choice.
    //     //we can use also width: '40%' but !!! if we use width:'40%' for children it is used for its parent size.
    //     //but if we use dimensions, it doesnt matter. It always get the device's whole screen.
    //     width: Dimensions.get('window').width / 4
    // },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryContainer: {
        marginTop:20,
        alignItems:'center'
    },
    text:{
        fontFamily:'open-sans',
    }
});

export default StartGameScreen;