import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";

import { COLORS, NFTData } from "../constants";
import { auth } from '../database/firebase';
import { FONTS } from '../constants'
import HomeCard from "../components/HomeCard";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
               
  const navigation = useNavigation()

  const handleSearch = (value) => {
    if (value.length === 0) {
      setNftData(NFTData);
    }

    const filteredData = NFTData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredData.length === 0) {
      setNftData(NFTData);
    } else {
      setNftData(filteredData);
    }
  };

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login')
    })
    .catch(error => console.log(error));
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row'  }}>
          <Image source={require('../assets/images/SeaCareLogo.png')} style={{ marginRight: 10, width: 25, height: 25  }} resizeMode='cover'/>
          <Text style={styles.title}>SeaCare</Text>
        </View>
        <Text style={styles.quote}>- Pollution of the air or of the land all ultimately land up in the sea</Text>
      </View>

      <HomeCard title={'Create Community'} iconName='forum' onPress={() => navigation.navigate('CreateCommunity')} />
      <HomeCard title={'Report Littering'} iconName='flag' onPress={() => navigation.navigate('ReportLittering')} />
      <HomeCard title={'Create Sensitization Campaign'} iconName='campaign' onPress={() => navigation.navigate('CreateCampaign')} />
      <HomeCard title={'Support Communities'} iconName='favorite' onPress={() => navigation.navigate('Donate')} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  headerContainer: {
    padding: 20,
    backgroundColor: '#548BDE',
    borderRadius: 10,
    marginBottom: 20
  },

  title: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: '#fff',
    marginBottom: 10
  },

  quote: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: '#fff',
  }
})

export default Home;
