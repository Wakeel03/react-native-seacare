import { View, Text,TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { updateDoc } from 'firebase/firestore'
import { db, storage } from '../database/firebase'
import { FONTS } from '../constants'
import { Icon } from 'react-native-elements'
import { getDownloadURL, ref } from 'firebase/storage'
import { useNavigation } from '@react-navigation/native'

const ReportedIssueCard = ({ issue }) => {
  const navigation = useNavigation()
  
  const [image, setImage] = useState('')
  
  useEffect(() => {
    if (issue.images[0]) {
        let imageRef = ref(storage, `report_litter/${issue.images[0]}`)
        getDownloadURL(imageRef).then((url) => {
        setImage(url)
      })
    }
  }, [])


  return (
    <TouchableOpacity style={[styles.container, { marginBottom: 20 }]} onPress={() => navigation.navigate('Issue', { issue })}>
      <Image resizeMode='cover' style={styles.image} source={{ uri: image }} />
      <View style={{flexGrow: 1}}>
          <Text style={styles.title}>{issue.title}</Text>
          <View style={{flexGrow: 1, flexDirection: 'row'}}>
            <Text style={styles.description}>{issue.description}</Text>
          </View>
          <View style={styles.container}>
            <Icon name='place' color='#548BDE'/>
            <Text style={styles.location}>{issue.location}</Text>
          </View>
          {/* {url && <Image key={url} style={styles.tinyLogo} source={{ uri: url }} />} */}
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    height: 15,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 3
  },
  
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    flex: 1,
    width: 1,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 14,
    marginTop: 5,
    marginBottom: 5
  },

  location: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginLeft: 4,
    height: 15,
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    borderRadius: 5,
    width: 70,
    height: 70,
    marginRight: 10,
  }
})

export default ReportedIssueCard