import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import CustomInput from '../components/CustomInput'
import ButtonFull from '../components/ButtonFull'
import StackScreenHeader from '../components/StackScreenHeader'

const CreateCommunity = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [members, setMembers] = useState([]);

  const createCommunity = async() => {
    const communitiesRef = collection(db, 'Communities')
    
    await addDoc(communitiesRef, {
      name,
      createdBy,
      description,
      members
    })

    navigation.navigate('Home')

  }

  return (
    <SafeAreaView style={styles.container}>
        <StackScreenHeader title='Create Community' />
        <CustomInput
          label={'Name'}
          placeholder="Name"
          onChangeText={newName => setName(newName)}
          defaultValue={name}
        />
        <CustomInput
          label={'Description'}
          placeholder="Description"
          onChangeText={newDescription => setDescription(newDescription)}
          defaultValue={description}
        />
        <CustomInput
          label={'Created By'}
          placeholder="Created By"
          onChangeText={newCreatedBy => setCreatedBy(newCreatedBy)}
          defaultValue={createdBy}
        />
        <CustomInput
          label={'Members'}
          placeholder="Members"
          onChangeText={newMembers => setMembers([newMembers])}
          defaultValue={members}
        />
        
        <View style={styles.buttonsWrapper}>
          <ButtonFull onPress={createCommunity} text={'Add Members'} backgroundColor='#626FDB' />
          <ButtonFull onPress={createCommunity} text='Create' backgroundColor='#54BD7E'/>
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

export default CreateCommunity