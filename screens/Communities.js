import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../database/firebase'
import CommunityCard from '../components/CommunityCard'
import { FONTS } from '../constants'

const Communities = () => {
  const [communities, setCommunities] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const colors = ['#548BDE', '#FFC107', '#F44336', '#4CAF50', '#3F51B5']
    
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

  return (
    <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.joinAction} onPress={() => {}}><Text style={{ fontFamily: FONTS.medium, fontSize: '12px'  }}>Join</Text></TouchableOpacity>
          <TouchableOpacity style={styles.myCommunities} onPress={() => {}}><Text style={{ fontFamily: FONTS.medium, fontSize: '12px'  }}>My Communities</Text></TouchableOpacity>
        </View>
        {communities && communities.map((community, index) => (
          <CommunityCard key={community.docId} community={community} avatarColor={colors[index % colors.length]} />
        ))}
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

  joinAction: {
    flex: 1,
    height: 30,
    marginRight: 10,
    borderRadius: 5,
    borderColor: '#548BDE',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  myCommunities: {
    flex: 1,
    marginLeft: 10,
    height: 30,
    borderRadius: 5,
    borderColor: '#54B5BB',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'

  }

})

export default Communities