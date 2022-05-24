import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FONTS } from '../constants'

const StackScreenHeader = ({ title }) => {
  const navigation = useNavigation()
    
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
        <Pressable onPress={() => navigation.goBack()}><Icon name='chevron-left' size={16} /></Pressable>
        <Text style={styles.title}>{ title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginLeft: 12
  }, 
})

export default StackScreenHeader