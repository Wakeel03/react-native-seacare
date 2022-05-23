import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const Issue = ({ route, navigation }) => {

  const { issue } = route.params;
  
  const approveIssue = async(id) => {
    const issuesDoc = doc(db, 'Issues', id)

    await updateDoc(issuesDoc, {
      is_approved: true
    })

  }
    
  return (
    <View style={styles.container}>
      <Text>{issue.title}</Text>
      <Text>{issue.description}</Text>
      <Text>{issue.location}</Text>
      {/* TODO: Check if admin to show approval button */}
      {!issue.is_approved && <TouchableOpacity onPress={() => approveIssue(issue.id)}><Text>Approve</Text></TouchableOpacity>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})

export default Issue