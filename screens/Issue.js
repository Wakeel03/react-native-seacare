import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import StackScreenHeader from '../components/StackScreenHeader';
import ButtonFull from '../components/ButtonFull';
import { FONTS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomInputImageCarousel from '../components/CustomInputImageCarousel';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../database/firebase';

const Issue = ({ route, navigation }) => {

  const { issue } = route.params;
  const [pictures, setPictures] = useState([])
  

  useEffect(() => {
    getPictures()
  }, [])

  const getPictures = async () => {
    const images = issue.images
    const _pictures = []

    for (let i = 0; i < images.length; i++) {
      let imageRef = ref(storage, `report_litter/${images[i]}`)
      
      const url = await getDownloadURL(imageRef)
        _pictures.push({
          uri: url
      })
    }
    
    setPictures(_pictures)
  }

  const approveIssue = async(id) => {
    const issuesDoc = doc(db, 'Issues', id)

    await updateDoc(issuesDoc, {
      is_approved: true
    })

  }
    
  return (
    <View style={{ padding: 20, justifyContent: 'space-between', height: '100%' }}>
      <View>
        <StackScreenHeader title={issue.title} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.location}>Location</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='place' size={15} color='#548BDE'/>
            <Text style={styles.locationText}>{issue.location}</Text>
          </View>
        </View>

        <Text style={styles.description}>{issue.description}</Text>

        {pictures.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          {/* <Text style={styles.images}>Images</Text> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomInputImageCarousel pictures={pictures} size={100} />
          </View>
        </View>}

      </View>


      {/* {isAttendBtnVisible ? <ButtonFull text={'Attend Event'} onPress={joinEvent} backgroundColor='#626FDB' /> : null} */}
      {!issue.is_approved && <ButtonFull onPress={() => approveIssue(issue.id)} text='Approve' backgroundColor='#548BDE' />}

    </View>
  )
}

const styles = StyleSheet.create({
  location: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginRight: 12
  },
  
  images: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginRight: 12
  },

  locationText: {
    marginLeft: 6,
    fontFamily: FONTS.regular,
    fontSize: 14
  },

  description: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginBottom: 20
  }

})

export default Issue