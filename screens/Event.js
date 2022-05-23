import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MONTHS } from '../utils'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../database/firebase'

const Event = ({ route, navigation }) => {

    const { event } = route.params
    const months = MONTHS
    const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    getVolunteersList()
  }, [])

  const getVolunteersList = async () => {
    const _volunteers = event.volunteers || []
    const usersRef = query(collection(db, 'Users'), where("uid", "in", _volunteers))
    const data = await getDocs(usersRef)

    setVolunteers(
      data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )

  }

  return (
    <View>
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
  )
}

export default Event