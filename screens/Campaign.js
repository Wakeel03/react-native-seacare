import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import StackScreenHeader from '../components/StackScreenHeader';
import ButtonFull from '../components/ButtonFull';
import { FONTS } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CustomInputImageCarousel from '../components/CustomInputImageCarousel';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../database/firebase';

const Campaign = ({ route, navigation }) => {

  const { campaign } = route.params;
  const [pictures, setPictures] = useState([])
  

  useEffect(() => {
    getPictures()
  }, [])

  const getPictures = async () => {
    const images = campaign.images
    const _pictures = []

    for (let i = 0; i < images.length; i++) {
      let imageRef = ref(storage, `create_campaign/${images[i]}`)
      
      const url = await getDownloadURL(imageRef)
        _pictures.push({
          uri: url
      })
    }
    
    setPictures(_pictures)
  }

  const approveCampaign = async(id) => {
    const campaignsDoc = doc(db, 'Campaigns', id)

    await updateDoc(campaignsDoc, {
      is_approved: true
    })

  }
    
  return (
    <SafeAreaView style={{ padding: 20, justifyContent: 'space-between', height: '100%', marginTop: 15 }}>
      <View>
        <StackScreenHeader title={campaign.title} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='place' size={15} color='#548BDE'/>
            <Text style={styles.location}>{campaign.location}</Text>
          </View>
        </View>

        <Text style={styles.description}>{campaign.description}</Text>

        {pictures.length > 0 && <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          {/* <Text style={styles.images}>Images</Text> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomInputImageCarousel pictures={pictures} size={100} />
          </View>
        </View>}

      </View>


      {/* {isAttendBtnVisible ? <ButtonFull text={'Attend Event'} onPress={joinEvent} backgroundColor='#626FDB' /> : null} */}
      {!campaign.is_approved && <ButtonFull onPress={() => approveCampaign(campaign.id)} text='Approve' backgroundColor='#548BDE' />}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  location: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginLeft: 12
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

export default Campaign