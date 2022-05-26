import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FONTS } from '../constants'

const HomeCards = ({ title, iconName, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.iconContainer}>
            <Icon name={iconName} size={20} color='#fff'/> 
        </View>
        <Text style={styles.title}>{ title }</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#54B5BB',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },

  iconContainer: {
    borderRadius: 10,
    padding: 8,
    backgroundColor: '#80D7DC',
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  title: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 12,
    fontFamily: FONTS.regular
  }
})

export default HomeCards