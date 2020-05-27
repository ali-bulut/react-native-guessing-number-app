import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native'

import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const Header = (props) => {
    return (
        //by using Platform.select() we are able to identify OS and styles which depend on it
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIos, android: styles.headerAndroid})}} >
            <TitleText style={styles.title}>{props.title}</TitleText>
        </View>     
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width:'100%',
        height:90,
        paddingTop:36,
        alignItems: 'center',
        justifyContent: 'center'
        //instead of using that we can create another styles for platforms
        // backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        // borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        // borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerIos:{
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerAndroid:{
        backgroundColor: Colors.primary
    },
    title:{
        color:Platform.OS === 'ios' ? Colors.primary : 'white'
    }
});

export default Header;