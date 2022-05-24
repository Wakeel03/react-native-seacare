import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../database/firebase'
import StackScreenHeader from '../components/StackScreenHeader'

const Community = ({ route, navigation }) => {
  const { isMember, community } = route.params
  const [members, setMembers] = useState([])

  useEffect(() => {
    getMembersList()
  }, [])

  const getMembersList = async () => {
    const _members = community.members || []
    const usersRef = query(collection(db, 'Users'), where("uid", "in", _members))
    const data = await getDocs(usersRef)

    setMembers(
      data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )

  }


  return (
    <View style={{ padding: 20 }}>
      <StackScreenHeader title={community.name} />
      {members.map(member => (
        <Text key={member.docId}>{member.displayName}</Text>
      ))}
    <Pressable onPress={() => navigation.navigate('CreateEvent', { isMember, community })}><Text>Create Event</Text></Pressable>
    </View>
    
  )
}

export default Community