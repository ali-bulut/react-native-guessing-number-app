import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';

//MainButton.ios and MainButton.android -> react native can understand those. So we dont need to check
//whether the platform is Ios or android. React use components for appropriate platform. And also
//when we import these files we should write ../components/MainButton !!! We dont need to write MainButton.ios or .android

const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        backgroundColor:Colors.primary,
        paddingVertical: 12,
        paddingHorizontal:30,
        borderRadius: 25
    },
    buttonText:{
        color:'white',
        fontFamily:'open-sans',
        fontSize:18
    }
})

export default MainButton;