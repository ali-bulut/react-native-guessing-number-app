import React from 'react';

import {TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
    return (
        //we use {...props} because when we use the fields about textInput component from another component
        //we able to change this component's fields.
        <TextInput {...props} style={{...styles.input, ...props.style}} />
    );
};

const styles = StyleSheet.create({
    input:{
        height:30,
        borderBottomColor:'grey',
        borderBottomWidth:1,
        marginVertical:10
    }
})

export default Input;