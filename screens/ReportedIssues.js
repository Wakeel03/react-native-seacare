import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../database/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase'
import ReportedIssueCard from '../components/ReportedIssueCard';


const ReportedIssues = () => {
  const [issues, setIssues] = useState([])
  
    
  useEffect(() => {
    //TODO: Check if approved if not admin
    getIssues()
  }, [])

  const getIssues = async() => {
    const issuesRef = collection(db, 'Issues')
    const data = await getDocs(issuesRef)
    setIssues(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  return (
    <View style={styles.container}>
       {issues && issues.map(issue => (
         <ReportedIssueCard issue={issue} key={issue.id}/>
        ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: 70,
    marginBottom: 20,
  },
});

export default ReportedIssues