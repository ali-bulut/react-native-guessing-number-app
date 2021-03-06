import React from "react";
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
  return (
      <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is over!</TitleText>
      <View style={styles.imageContainer}>
        <Image 
        source={require("../assets/success.png")}
        // source={{uri:'https://miro.medium.com/max/6563/1*QqoS6WsjG6WSr9-BFFQhbA.jpeg'}} 
        style={styles.image} />
      </View>
      <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number 
      <Text style={styles.highlight}> {props.userNumber}</Text></BodyText>
      </View>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer:{
      width: Dimensions.get('window').width * 0.7,
      height:Dimensions.get('window').width * 0.7,
      //borderRadius should be half of the width and height
      borderRadius:Dimensions.get('window').width * 0.7 / 2,
      borderWidth:3,
      borderColor:'black',
      //by using this, imageContainer collapse its children
      overflow:'hidden',
      marginVertical:Dimensions.get('window').height / 30
  },
  resultText: {
    textAlign:'center',
    fontSize:Dimensions.get('window').height < 400 ? 16 : 20
  },
  highlight: {
    color:Colors.primary,
    fontFamily:'open-sans-bold'
  },
  resultContainer: {
      marginHorizontal:30,
      marginVertical: Dimensions.get('window').height / 60
  }
});

export default GameOverScreen;
