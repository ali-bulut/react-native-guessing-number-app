import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = (props) => {
    return (
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        //these shadow options only work on IOS.
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        //so we use elevation to give shadow. It only works on Android. 
        //And we cannot configure shadow options manually like IOS.
        elevation:5,
        backgroundColor:'white',
        padding: 20,
        borderRadius:10
    }
})

export default Card;