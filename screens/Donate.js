import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { auth } from '../database/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../database/firebase'
import CommunityCard from '../components/CommunityCard'
import { FONTS } from '../constants'
import StackScreenHeader from '../components/StackScreenHeader'
import { useNavigation } from '@react-navigation/native'

const Donate = () => {
  const [communities, setCommunities] = useState([])

    const [currentUser, setCurrentUser] = useState(null)
    const colors = ['#548BDE', '#FFC107', '#F44336', '#4CAF50', '#3F51B5']
    
    const navigation = useNavigation()

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
    let data = await getDocs(communitiesRef)
    let communities = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))

    setCommunities(communities)
  }

  return (
    <SafeAreaView style={styles.container}>
        <StackScreenHeader title="Bring your support to Communities" />
        {communities.map((community, index) => (
            <CommunityCard key={community.docId} onPress={() => navigation.navigate('DonateCommunity', { community })}  isMember={true} community={community} backgroundColor={colors[index % colors.length]} />
        ))}    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 15
  },

  title: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    marginBottom: 20
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
})

export default Donate