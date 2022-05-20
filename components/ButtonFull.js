import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'

const ButtonFull = ({ text, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor} ]} onPress={onPress}><Text style={styles.text}>{text}</Text></TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 40,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    text: {
        color: '#fff',
        fontFamily: FONTS.medium,
        fontSize: '14px'
    }


})

export default ButtonFull