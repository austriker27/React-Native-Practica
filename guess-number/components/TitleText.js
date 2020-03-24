import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => {
    return (
        <Text style={{ ...styles.body, ...props.style }}>
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    body: {
        fontFamily: 'lazer84',
        fontSize: 20,
        letterSpacing: 3
    }
})

export default TitleText;