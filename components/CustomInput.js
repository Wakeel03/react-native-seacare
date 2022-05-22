import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'

const CustomInput = ({ label, placeholder, onChangeText, defaultValue }) => {
  return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            defaultValue={defaultValue}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 15
    },
    label:{
        marginBottom: 5,
        fontFamily: FONTS.medium,
        fontSize: 14
    },
    input: {
        borderWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 5,
        padding: 10,
        fontFamily: FONTS.regular,
        backgroundColor: '#FBFBFB',
        fontSize: 12
    }
})

export default CustomInput