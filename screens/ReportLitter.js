import { View, TextInput, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../database/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import app from  '../database/firebase'
import { db } from '../database/firebase'

const ReportLitter = () => {
  const navigation = useNavigation();
  
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState('');

  const options = {
    saveToPhotos: true,
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
  }

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
      setPicture(result.uri)
    }

  }

  if (!hasGalleryPermission) {
    return <Text>No Access to Internal Storage</Text>
  }

  const sendPicture = async() => {
    // const imageRef = ref(storage, `report_litter/${Date.now()}`);
    // await uploadBytes(imageRef, picture)
    let snapshot = await db.collection("ReportLitters").where('uid', '==', '1').get()
    snapshot.docs.forEach(doc => {
      console.log(doc.data())
    })
  // Atomically add a new region to the "regions" array field.
  // var arrUnion = washingtonRef.update({
  //   regions: admin.firestore.FieldValue.arrayUnion('greater_virginia')
  // });
  // // Atomically remove a region from the "regions" array field.
  // var arrRm = washingtonRef.update({
  //   regions: admin.firestore.FieldValue.arrayRemove('east_coast')
  // });



    
  }

  return (
    <View>
        <TouchableOpacity onPress={() => pickImage()}><Text>Open Camera</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => pickImage()}><Text>Open Gallery</Text></TouchableOpacity>
        <TextInput
          style={{height: 40}}
          placeholder="Description"
          onChangeText={newDescription => setText(newDescription)}
          defaultValue={description}
        />
        {picture && <Image source={{ uri: picture }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity onPress={() => sendPicture()}><Text>Submit</Text></TouchableOpacity>
    </View>
  )
}

export default ReportLitter