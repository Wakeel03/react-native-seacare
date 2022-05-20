import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { db } from '../database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import CustomInput from '../components/CustomInput'
import ButtonFull from '../components/ButtonFull'

const CreateEvent = () => {
    //TODO: Possibility of linking to existing issues
  const navigation = useNavigation();
  
  
  const [name, setName] = useState('')
  const [organisedBy, setOrganisedBy] = useState('')
  const [location, setLocation] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [volunteers, setVolunteers] = useState([])

  const createEvent = async() => {
    const eventsRef = collection(db, 'Events')
    
    await addDoc(eventsRef, {
        name,
        organisedBy,
        description,
        location,
        datetime: new Date(`${date} ${time}`),
        volunteers
    })

  }

  return (
    <View style={styles.container}>
        <CustomInput
          label={'Name'}
          placeholder="Name"
          onChangeText={newName => setName(newName)}
          defaultValue={name}
        />
        <CustomInput
          label={'Organised By'}
          placeholder="Organised By"
          onChangeText={newOrganisedBy => setOrganisedBy(newOrganisedBy)}
          defaultValue={organisedBy}
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
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonsWrapper: {
    marginTop: 30
  }
})

export default CreateEvent