import { View, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'

const Communities = () => {
  const [communities, setCommunities] = useState([])
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
    getCommunities()
  }, [])

  const getCommunities = async () => {
    const communitiesRef = collection(db, 'Communities')
    const data = await getDocs(communitiesRef)

    setCommunities(
      data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )
  }

  const joinCommunity = async (communityId) => {
    const communityDocsRef = doc(db, 'Communities', communityId)
    await updateDoc(communityDocsRef, {
      members: arrayUnion(currentUser)
    })
  }

  return (
    <View>
        {communities && communities.map((community) => (
            <View key={community.docId}>
                <Text>{community.name}</Text>
                <TouchableOpacity onPress={() => joinCommunity(community.docId)}><Text>Join</Text></TouchableOpacity>
            </View>
        ))}
    </View>
  )
}

export default Communities