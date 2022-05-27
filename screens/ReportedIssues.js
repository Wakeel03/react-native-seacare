import { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, RefreshControl, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase'
import ReportedIssueCard from '../components/ReportedIssueCard';
import { useNavigation } from '@react-navigation/native';
import ButtonFull from '../components/ButtonFull';

const ReportedIssues = () => {
  const [issues, setIssues] = useState([])
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getIssues().then(() => setRefreshing(false));
  }, [])
    
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
    <SafeAreaView style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {issues && issues.map(issue => (
          <View key={issue.id}>
            <ReportedIssueCard issue={issue} />
            <View style={styles.divider}></View>
          </View>
          ))}
       </ScrollView>

        {/* <View style={styles.buttonContainer}> */}
          <ButtonFull onPress={() => navigation.navigate('ReportLittering')} text={'Report Littering'} backgroundColor='#626FDB' />
        {/* </View> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: '100%',
    marginBottom: 100,
  },
  
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginBottom: 20
  },
  
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20
  }
});

export default ReportedIssues