import { View, Text, StyleSheet, Image, FlatList, Pressable } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'
import { useNavigation } from '@react-navigation/native'

const CustomInputImageCarousel = ({ pictures, size}) => {
  const navigation = useNavigation()

  return (
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Images</Text>
        <FlatList 
        data={pictures}
        renderItem={({ item: picture }) => (
            <Pressable
            onPress={() => navigation.navigate('ImageViewer', { picture })}
            style={{
              flex: 1,
              flexDirection: 'column',
              marginRight: 8,
              marginBottom: 8
            }}>
                {size ? <Image source={{ uri: picture.uri }} style={[styles.image, { width: size, height: size  }]} resizeMode='cover'/> :
                <Image source={{ uri: picture.uri }} style={[styles.image, { width: size, height: size  }]} resizeMode='cover'/>}
            </Pressable>
        )}
        style={styles.carouselWrapper}
        numColumns={size ? 3 : 5}
        keyExtractor={(item, index) => index}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    label:{
        marginBottom: 5,
        fontFamily: FONTS.medium,
        fontSize: 14
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