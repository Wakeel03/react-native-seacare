import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'

const CustomInputImageCarousel = ({ pictures }) => {
  return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Images</Text>
        <View style={styles.carouselWrapper}>
        {
            pictures.map((picture, index) => (
                <Image key={index} source={{ uri: picture.uri }} style={styles.image} resizeMode='cover'/>
            ))
        }
        </View>
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
        fontSize: '14px'
    },
    carouselWrapper: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden'
    }
})

export default CustomInputImageCarousel