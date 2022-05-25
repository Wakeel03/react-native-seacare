import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MONTHS } from '../utils'
import { arrayUnion, collection, doc, getDocs, getDoc, increment, query, where } from 'firebase/firestore'
import { updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import StackScreenHeader from '../components/StackScreenHeader'
import ButtonFull from '../components/ButtonFull'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { FONTS } from '../constants'
import MinimalCard from '../components/MinimalCard'

const Event = ({ route, navigation }) => {

    const { currentUser, event } = route.params
    const months = MONTHS
    const [volunteers, setVolunteers] = useState([])
    const [isAttendBtnVisible, setIsAttendBtnVisible] = useState(true)
    const eventPoint = 10

  useEffect(() => {
    getVolunteersList()
  }, [])

  const getVolunteersList = async () => {
    const _volunteers = event.volunteers || []
    if (_volunteers.length == 0) return

    const usersRef = query(collection(db, 'Users'), where("uid", "in", _volunteers))
    const data = await getDocs(usersRef)

    setVolunteers(
      data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )

  }

  useEffect(() => {
    if (volunteers.length == 0) return

    //Check if user in volunteers list
    console.log(volunteers)
    const isUserInVolunteersList = volunteers.find(volunteer => volunteer.uid == currentUser)
    if (isUserInVolunteersList) setIsAttendBtnVisible(false)

  }, [volunteers])

  const joinEvent = async () => {
    const eventDocsRef = doc(db, 'Events', event.docId)
    await updateDoc(eventDocsRef, {
      volunteers: arrayUnion(currentUser)
    })

    const userRef = query(collection(db, 'Users'), where('uid', '==', currentUser))
    const userDoc = await getDocs(userRef)
    console.log(userDoc)
    const userDocId = userDoc.docs[0].id
    await updateDoc(doc(db, 'Users', userDocId), {
      points: increment(eventPoint)
    })
    setIsAttendBtnVisible(false)
    navigation.navigate('Home')
  }

  const colors = [
    '#7ECDD2',
    '#83ACEA'
  ]

  return (
    <View style={{ padding: 20, justifyContent: 'space-between', height: '100%' }}>
      <View>
        <StackScreenHeader title={event.name} />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.date}>Date</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='event' size={15} color='#548BDE'/>
            <Text style={styles.dateText}>{event.datetime.toDate().getDate()} {months[event.datetime.toDate().getMonth()]} {event.datetime.toDate().getFullYear()} {event.datetime.toDate().getHours()}:{`${event.datetime.toDate().getMinutes()}0`.slice(0, 2)}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={styles.location}>Location</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='place' size={15} color='#548BDE'/>
            <Text style={styles.locationText}>{event.location}</Text>
          </View>
        </View>

        <Text style={styles.description}>{event.description}</Text>

        <Text style={styles.volunteers}>Volunteers</Text>
        {
          volunteers.map((volunteer, index) => (
              <MinimalCard key={volunteer.docId} mainText={volunteer.displayName} backgroundColor={colors[index % colors.length]} />
          ))
        }

      </View>

      {isAttendBtnVisible ? <ButtonFull text={'Attend Event'} onPress={joinEvent} backgroundColor='#626FDB' /> : null}

    </View>
  )
}

const styles = StyleSheet.create({
  date: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginRight: 12
  },
  
  location: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginRight: 12
  },
  
  volunteers: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginBottom: 8
  },

  dateText: {
    marginLeft: 6,
    fontFamily: FONTS.regular,
    fontSize: 14
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

export default Event