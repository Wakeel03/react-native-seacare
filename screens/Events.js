import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import EventsCard from '../components/EventsCard'
import { FONTS } from '../constants'

const Events = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const [isAttendingEventsSelected, setIsAttendingEventsSelected] = useState(true)
    const [myEvents, setMyEvents] = useState([])
    const [otherEvents, setOtherEvents] = useState([])
    
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
  }, [currentUser])


  const getEvents = async () => {
    if (!currentUser) return
    
    const eventsRef = collection(db, 'Events')
    let data = await getDocs(eventsRef)

    data = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    console.log('User', currentUser)
    console.log(data)
    
    const _myEvents = data.filter((event) => event.volunteers.includes(currentUser))
    const _otherEvents = data.filter((event) => !event.volunteers.includes(currentUser))

    setMyEvents(_myEvents)
    setOtherEvents(_otherEvents)
  }

  const colors = ['#548BDE', '#FFC107', '#F44336', '#4CAF50', '#3F51B5']

  return (
    <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.attendingEvents, isAttendingEventsSelected ? { backgroundColor: '#7ECDD2' } : {}]} onPress={() => {setIsAttendingEventsSelected(true)}}><Text style={{ fontFamily: FONTS.medium, fontSize: 12  }}>My Events</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.otherEvents, !isAttendingEventsSelected ? { backgroundColor: '#83ACEA'} : {}]} onPress={() => {setIsAttendingEventsSelected(false)}}><Text style={{ fontFamily: FONTS.medium, fontSize: 12  }}>Other Events</Text></TouchableOpacity>
        </View>
      
        {isAttendingEventsSelected ? (myEvents.length > 0 ? myEvents.map((event, index) => (
            <View key={event.docId}>
              <View style={styles.cards}>
                <EventsCard currentUser={currentUser} event={event} backgroundColor={colors[index % colors.length]} />
              </View>  
              <View style={styles.divider}></View>
            </View>
        )) : <Text style={{ fontFamily: FONTS.medium, fontSize: 18, textAlign: 'center', marginTop: 20 }}>No events to show</Text>) 
        
        : (otherEvents.length > 0 ? otherEvents.map((event, index) => (
            <View key={event.docId} style={styles.cards}>
              <EventsCard currentUser={currentUser} event={event} backgroundColor={colors[index % colors.length]} />
            </View>
        )): <Text style={{ fontFamily: FONTS.medium, fontSize: 18, textAlign: 'center', marginTop: 20 }}>No events to show</Text>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },

  cards: {
    marginBottom: 20
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%'
  },

  otherEvents: {
    flex: 1,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#548BDE',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  attendingEvents: {
    flex: 1,
    height: 30,
    borderRadius: 5,
    borderColor: '#54B5BB',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }

})

export default Events