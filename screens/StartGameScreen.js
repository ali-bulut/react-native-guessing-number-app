import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard} from 'react-native';

import Colors from '../constants/colors';

import Card from '../components/Card';
import Input from '../components/Input';

const StartGameScreen = () => {

    const [enteredValue, setEnteredValue] = useState('');

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    return (
        //when we click the screen the keyboard will be closed automatically
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input onChangeText={numberInputHandler} value={enteredValue} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} style={styles.input} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button title="Reset" onPress={() => {}} color={Colors.secondary} /></View>
                    <View style={styles.button}><Button title="Confirm" onPress={() => {}} color={Colors.primary} /></View>
                </View>
            </Card>
        </View>     
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:"center"
    },
    title:{
        fontSize:20,
        marginVertical: 10
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center'
    },
    buttonContainer:{
        //default is column but we use row in order to want that buttons are next each other
        flexDirection: 'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    button:{
        width: 100
    },
    input:{
        width:50,
        textAlign:'center'
    }
});

export default StartGameScreen;