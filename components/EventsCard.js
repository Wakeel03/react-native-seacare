import { View, Text,TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS } from '../constants'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { MONTHS } from '../utils'

const EventsCard = ({ currentUser, event, backgroundColor }) => {
  const navigation = useNavigation()
  
  const [image, setImage] = useState('')

  const months = MONTHS
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Event', { currentUser, event })} style={styles.container}>
      <View style={[styles.date, { backgroundColor }]}> 
        <View style={styles.dateContainer}>
            <Text style={styles.day}>{event.datetime.toDate().getDate()}</Text>
            <Text style={styles.dateYear}>{months[event.datetime.toDate().getMonth()]} {event.datetime.toDate().getFullYear()}</Text>
        </View>
      </View>
      <View style={{flexGrow: 1}}>
          <Text style={styles.title}>{event.name}</Text>
          <View style={{flexGrow: 1, flexDirection: 'row'}}>
            <Text style={styles.description}>{event.description}</Text>
          </View>
            <View style={[styles.container, { marginRight: 10 }]}>
                <Icon name='place' color='#548BDE'/>
                <Text style={styles.location}>{event.location}</Text>
            </View>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    display: 'flex',
    alignItems: 'center',
  },
  
  description: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    flex: 1,
    width: 1,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 14,
    marginTop: 5,
    marginBottom: 5
  },

  location: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    marginLeft: 4,
    display: 'flex',
    alignItems: 'center',
  },

  date: {
    borderRadius: 5,
    width: 78,
    height: 78,
    marginRight: 10,
  },

  dateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  day: {
    fontSize: 26,
    color: '#fff',
    fontFamily: FONTS.semiBold,
    marginBottom: -5
  },

  dateYear: {
      fontSize: 12,
      color: '#fff',
      fontFamily: FONTS.medium
  }
})

export default EventsCard
