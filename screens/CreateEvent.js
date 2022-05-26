import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import CustomInput from '../components/CustomInput'
import ButtonFull from '../components/ButtonFull'
import StackScreenHeader from '../components/StackScreenHeader'

const CreateEvent = ({ route }) => {
    //TODO: Possibility of linking to existing issues
  const navigation = useNavigation();
  
  const { isMember, community } = route.params
  
  
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [volunteers, setVolunteers] = useState([])

  const createEvent = async() => {
    const eventsRef = collection(db, 'Events')
    
    await addDoc(eventsRef, {
        name,
        organisedBy: community.docId,
        description,
        location,
        datetime: new Date(`${date} ${time}`),
        volunteers
    })

    navigation.navigate('Home')

  }

  return (
    <View style={styles.container}>
        <StackScreenHeader title='Create Event' />
        <CustomInput
          label={'Name'}
          placeholder="Name"
          onChangeText={newName => setName(newName)}
          defaultValue={name}
        />

        <CustomInput
          label={'Description'}
          placeholder="Description"
          onChangeText={newDescription => setDescription([newDescription])}
          defaultValue={description}
        />
        
        <CustomInput 
            label={'Location'}
            placeholder="Location"
            onChangeText={newLocation => setLocation(newLocation)}
            defaultValue={location}
        />

        <CustomInput 
            label={'Date'}
            placeholder="Date"
            onChangeText={newDate => setDate(newDate)}
            defaultValue={date}
        />

        <CustomInput 
            label={'Time'}
            placeholder="Time"
            onChangeText={newTime => setTime(newTime)}
            defaultValue={time}
        />

        <CustomInput 
            label={'Volunteers'}
            placeholder="Volunteers"
            onChangeText={newVolunteers => setVolunteers([newVolunteers])}
            defaultValue={volunteers}
        />
        
        <View style={styles.buttonsWrapper}>
          <ButtonFull onPress={createEvent} text={'Link to Reported Issue'} backgroundColor='#626FDB' />
          <ButtonFull onPress={createEvent} text={'Create'} backgroundColor='#54BD7E' />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  buttonsWrapper: {
    marginTop: 30
  }
})

export default CreateEvent