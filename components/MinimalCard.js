import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'

const MinimalCard = ({ mainText, subText, backgroundColor, onPress }) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.mainText}>{mainText}</Text>
      {subText && <Text style={styles.subText}>{subText}</Text>}

    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%', 
        borderRadius: 10, 
        height: 45, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 14,
        marginBottom: 10
    },

    mainText: {
        fontFamily: FONTS.medium,
        color: '#fff',
        fontSize: 12
    },

    subText: {
        fontFamily: FONTS.medium,
        color: '#fff',
        fontSize: 10
    }
})

export default MinimalCard