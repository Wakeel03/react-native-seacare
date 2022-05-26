import { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../database/firebase'
import SensitizationCampaignsCard from '../components/SensitizationCampaignsCard';
import { useNavigation } from '@react-navigation/native';
import ButtonFull from '../components/ButtonFull';


const SensitizationCampaigns = () => {
    const [campaigns, setCampaigns] = useState([])
    const navigation = useNavigation()
    
      
    useEffect(() => {
      //TODO: Check if approved if not admin
      getCampaigns()
    }, [])
  
    const getCampaigns = async() => {
      const campaignsRef = collection(db, 'Campaigns')
      const data = await getDocs(campaignsRef)
      setCampaigns(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    }
  
    return (
      <View style={styles.container}>
         {campaigns && campaigns.map(campaign => (
           <View key={campaign.id}>
            <SensitizationCampaignsCard campaign={campaign} />
            <View style={styles.divider}></View>
           </View>
          ))}
          <View style={styles.buttonContainer}>
            <ButtonFull onPress={() => navigation.navigate('CreateCampaign')} text={'Create Campaign'} backgroundColor='#626FDB' />
          </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 20,
      paddingRight: 20,
      height: '100%',
      marginBottom: 20,
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
  
  export default SensitizationCampaigns