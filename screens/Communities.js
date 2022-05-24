import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../database/firebase'
import CommunityCard from '../components/CommunityCard'
import { FONTS } from '../constants'

const Communities = () => {
  const [myCommunities, setMyCommunities] = useState([])
  const [otherCommunities, setOtherCommunities] = useState([])
  const [isMyCommunitiesSelected, setIsMyCommunitiesSelected] = useState(false)

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
  }, [currentUser])

  const getCommunities = async () => {
    if (!currentUser) return
    
    const communitiesRef = collection(db, 'Communities')
    let data = await getDocs(communitiesRef)
    data = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    
    const _myCommunities = data.filter((community) => community.members.includes(currentUser))
    const _otherCommunities = data.filter((community) => !community.members.includes(currentUser))

    setMyCommunities(_myCommunities)
    setOtherCommunities(_otherCommunities)

  }

  return (
    <View style={styles.container}>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.joinAction, !isMyCommunitiesSelected ? { backgroundColor: '#83ACEA' } : {}]} onPress={() => {setIsMyCommunitiesSelected(false)}}><Text style={{ fontFamily: FONTS.medium, fontSize: 12  }}>Join</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.myCommunities, isMyCommunitiesSelected ? { backgroundColor: '#7ECDD2' } : {}]} onPress={() => {setIsMyCommunitiesSelected(true)}}><Text style={{ fontFamily: FONTS.medium, fontSize: 12  }}>My Communities</Text></TouchableOpacity>
        </View>

        {isMyCommunitiesSelected ? (myCommunities.length > 0 ? myCommunities.map((community, index) => (
          <CommunityCard key={community.docId} isMember={true} community={community} backgroundColor={colors[index % colors.length]} />
        )) : <Text style={{ fontFamily: FONTS.medium, fontSize: 18, textAlign: 'center', marginTop: 20 }}>You are not part of any community</Text>) 
        : 
          otherCommunities.length > 0 ? otherCommunities.map((community, index) => (
           <CommunityCard key={community.docId} isMember={false} community={community} backgroundColor={colors[index % colors.length]} />
          )) : <Text style={{ fontFamily: FONTS.medium, fontSize: 18, textAlign: 'center', marginTop: 20 }}>No communities found</Text>
        }
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