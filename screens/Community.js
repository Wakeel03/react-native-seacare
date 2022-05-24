import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../database/firebase'
import StackScreenHeader from '../components/StackScreenHeader'
import MinimalCard from '../components/MinimalCard'
import { FONTS } from '../constants'
import ButtonFull from '../components/ButtonFull'

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
  
  const joinCommunity = async (communityId) => {
    const communityDocsRef = doc(db, 'Communities', communityId)
    await updateDoc(communityDocsRef, {
      members: arrayUnion(currentUser)
    })
  }

  const colors = [
    '#7ECDD2',
    '#83ACEA'
  ]

  return (
    <View style={{ padding: 20, justifyContent: 'space-between', height: '100%' }}>
      <View>
        <StackScreenHeader title={community.name} />

        <Text style={styles.aboutUs}>About Us</Text>
        <Text style={styles.description}>{community.description}</Text>

        <Text style={styles.members}>Members</Text>
        {
          members.map((member, index) => (
              <MinimalCard key={member.docId} mainText={member.displayName} backgroundColor={colors[index % colors.length]} />
          ))
        }

      </View>
      <ButtonFull text='Create Event' backgroundColor='#548BDE' onPress={() => navigation.navigate('CreateEvent', { isMember, community })} />
    </View>

    
  )
}

const styles = StyleSheet.create({
  aboutUs: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginBottom: 8
  },
  
  members: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    marginBottom: 8
  },

  description: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    marginBottom: 20
  }

})

export default Community