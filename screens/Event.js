import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MONTHS } from '../utils'
import { arrayUnion, collection, doc, getDocs, query, where } from 'firebase/firestore'
import { updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import StackScreenHeader from '../components/StackScreenHeader'
import ButtonFull from '../components/ButtonFull'

const Event = ({ route, navigation }) => {

    const { currentUser, event } = route.params
    const months = MONTHS
    const [volunteers, setVolunteers] = useState([])
    const [isAttendBtnVisible, setIsAttendBtnVisible] = useState(false)

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
    if (!isUserInVolunteersList) setIsAttendBtnVisible(true)

  }, [volunteers])

  const joinEvent = async () => {
    const eventDocsRef = doc(db, 'Events', event.docId)
    await updateDoc(eventDocsRef, {
      volunteers: arrayUnion(currentUser)
    })
    isAttendBtnVisible(false)
  }

  return (
    <View style={{ padding: 20, justifyContent: 'space-between', height: '100%' }}>
      <View>
        <StackScreenHeader title={event.name} />
        <Text>{event.datetime.toDate().getDate()}</Text>
        <Text>{months[event.datetime.toDate().getMonth()]} {event.datetime.toDate().getFullYear()}</Text>
        <Text>{event.name}</Text>
        <Text>{event.description}</Text>
        <Text>{event.location}</Text>
        {
          volunteers.map((volunteer) => (
              <Text key={volunteer.docId}>{volunteer.displayName}</Text>
          ))
        }

      </View>

      {isAttendBtnVisible ? <ButtonFull text={'Attend Event'} onPress={joinEvent} backgroundColor='#626FDB' /> : null}

    </View>
  )
}

export default Event