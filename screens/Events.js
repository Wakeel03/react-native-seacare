import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import EventsCard from '../components/EventsCard'

const Events = () => {
  const [events, setEvents] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setCurrentUser(uid)
        } else {
            console.log('User is signed out!')
        }
});

  useEffect(() => {
    getEvents()
  }, [])


  const getEvents = async () => {
    const eventsRef = collection(db, 'Events')
    const data = await getDocs(eventsRef)

    setEvents(
      data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )
  }

  const colors = ['#548BDE', '#FFC107', '#F44336', '#4CAF50', '#3F51B5']

  return (
    <View style={styles.container}>
        {events && events.map((event, index) => (
            <View key={event.docId} style={styles.cards}>
              <EventsCard event={event} backgroundColor={colors[index % colors.length]} />
            </View>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },

  cards: {
    marginBottom: 20
  }
})

export default Events