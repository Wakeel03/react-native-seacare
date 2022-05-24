import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FONTS } from '../constants'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import { useNavigation } from '@react-navigation/native'

const CommunityCard = ({ isMember, community, avatarColor, currentUser }) => {
  const navigation = useNavigation()

  const joinCommunity = async (communityId) => {
    const communityDocsRef = doc(db, 'Communities', communityId)
    await updateDoc(communityDocsRef, {
      members: arrayUnion(currentUser)
    })
  }

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Community', { isMember, community })}  style={[styles.container, { borderWidth: 1, borderColor: avatarColor }]}>
        <View style={[styles.circleAvatar, { backgroundColor: avatarColor }]}></View>
        <Text style={styles.name}>{community.name}</Text>
        {!isMember && <TouchableOpacity style={styles.join} onPress={() => joinCommunity(community.docId)}><Text style={styles.joinText}>Join</Text></TouchableOpacity>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 70,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20
    },

    circleAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10
    },

    name: {
        marginLeft: 10,
        fontFamily: FONTS.medium,
        fontSize: 14
    },

    join: {
        marginLeft: 'auto',
        height: 25,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#548BDE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    joinText: {
        fontFamily: FONTS.regular,
        color: '#fff',
        fontSize: 12
    }

})

export default CommunityCard