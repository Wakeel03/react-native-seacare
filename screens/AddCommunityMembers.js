import { View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { db } from '../database/firebase'
import { arrayUnion, collection, doc, getDocs, updateDoc } from 'firebase/firestore';

const AddCommunityMembers = () => {
    const communityId = 'nX1RFSQptrAUON8wminK'
    const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
      const usersRef = collection(db, 'Users')
      const data = await getDocs(usersRef)

      setUsers(
        data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
      )
  }

  const addMember = async (userId) => {
      const communitiesDocRef = doc(db, 'Communities', communityId)
      await updateDoc(communitiesDocRef, {
        members: arrayUnion(userId)
      })
      
  }

  return (
    <View>
      {users && users.map((user) => (
        <View key={user.docId}>
            <Text>{user.email}</Text>
            <TouchableOpacity onPress={() => addMember(user.uid)}><Text>Add</Text></TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default AddCommunityMembers