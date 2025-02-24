import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../database/firebase'
import { db } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import CustomInput from '../components/CustomInput'
import CustomInputImageCarousel from '../components/CustomInputImageCarousel'
import ButtonFull from '../components/ButtonFull'
import StackScreenHeader from '../components/StackScreenHeader'
import { useNavigation } from '@react-navigation/native'

const CreateCampaign = () => {
  
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const navigation = useNavigation()
  
  const [title, setTitle] = useState('');
  const [pictures, setPictures] = useState([]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted')

    })()
  },[])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      })
      
      setPictures([...pictures, {
        blob,
        uri: result.uri
      }])
    }

  }

  if (!hasGalleryPermission) {
    return <Text>No Access to Internal Storage</Text>
  }

  const create_campaign = async() => {
    const imagesNames = await sendPictures()
    const campaignsRef = collection(db, 'Campaigns')
    
    await addDoc(campaignsRef, {
      description,
      images: imagesNames,
      is_approved: false,
      title

    })

    navigation.navigate('Home')

  }

  const sendPictures = async() => {
    //TODO: Upload multiple images -> return array of Names
    try{
      let imageNames = []

      pictures.forEach(async (picture) => {
        const imageRef = ref(storage, `create_campaign/${Date.now()}`)
        const res = await uploadBytesResumable(imageRef, picture.blob)
        imageNames = [...imageNames, res.metadata.name]
      })
      
      return imageNames
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <StackScreenHeader title={'Create Campaign'}/>

        <CustomInput label={'Title'} placeholder={'Enter a title'} onChangeText={(newTitle) => setTitle(newTitle)} defaultValue={title}/>
        <CustomInput label={'Description'} placeholder={'Write a description'} onChangeText={(newDescription) => setDescription(newDescription)} defaultValue={description}/>
        <CustomInput label={'Location'} placeholder={'Write a location'} onChangeText={(newLocation) => setLocation(newLocation)} defaultValue={location}/>
        
        {pictures && <CustomInputImageCarousel pictures={pictures} size={50}/>}
        
        <View style={styles.buttonsWrapper}>
          <ButtonFull text={'Upload Pictures'} onPress={() => pickImage()} backgroundColor='#626FDB' />
          <ButtonFull text={'Submit'} onPress={() => create_campaign()} backgroundColor='#54BD7E' />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 15
  },

  buttonsWrapper: {
    marginTop: 30
  }
})

export default CreateCampaign