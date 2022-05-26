import { View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import StackScreenHeader from '../components/StackScreenHeader'

const ImageViewer = ({ route, navigation }) => {
  const { picture } = route.params

  return (
    <SafeAreaView style={{ padding: 20, height: '100%', width: '100%', marginTop: 15 }}>
        <StackScreenHeader title="Back" />
        <Image source={picture} style={{ width: '100%', height: '75%' }} resizeMode='cover' />
    </SafeAreaView>
  )
}

export default ImageViewer