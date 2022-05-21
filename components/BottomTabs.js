import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddCommunityMembers from '../screens/AddCommunityMembers';
import Communities from '../screens/Communities';
import CreateCommunity from '../screens/CreateCommunity';
import CreateEvent from '../screens/CreateEvent';
import Details from '../screens/Details';
import Events from '../screens/Events';
import Home from '../screens/Home';
import ReportedIssues from '../screens/ReportedIssues';
import ReportLitter from '../screens/ReportLitter';
import { Icon } from 'react-native-elements'
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { FONTS } from '../constants';

const BottomTabs = () => {
  const Tab = createBottomTabNavigator();
  const activeIconColor = '#fff'
  const inactiveIconColor = '#000'

  return (
    <Tab.Navigator screenOptions={{
        tabBarStyle: { boxShadow: '-2px 0 10px rgb(0 0 0 / 0.2)' },
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeIconColor,
        tabBarInactiveTintColor: inactiveIconColor,
        headerTitleStyle: {
          fontFamily: FONTS.semiBold
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerShadowVisible: false
      }}>

    <Tab.Screen name="Communities" component={Communities} />
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, focused }) => (
          focused ? <View style={styles.activeTabBackground}><Icon name="home" color={color} /></View> : <Icon name="home" color={color}/>
          ),
        }}/>

      <Tab.Screen name="Events" component={Events} options={{
        tabBarIcon: ( { color, focused }) => (
          focused ? <View style={styles.activeTabBackground}><Icon name="event" color={color} /></View> : <Icon name="event" color={color}/>
          ),
        }}/>

        <Tab.Screen name="Report Littering" component={ReportLitter} options={{
            tabBarIcon: ({ color, focused }) => (
              focused ? <View style={styles.activeTabBackground}><Icon name="report" color={color} /></View> : <Icon name="report" color={color}/>
            ),
          }}/>

      <Tab.Screen name="Reported Issues" component={ReportedIssues} options={{
          tabBarIcon: ({ color, focused }) => (
            focused ? <View style={styles.activeTabBackground}><Icon name="report" color={color} /></View> : <Icon name="report" color={color}/>
          ),
        }}/>
        
      
        {/* <Tab.Screen name="Create Community" component={CreateCommunity} />
        <Tab.Screen name="Create Event" component={CreateEvent} />
      <Tab.Screen name="Add Member" component={AddCommunityMembers} /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  activeTabBackground: {
    padding: 5,
    backgroundColor: '#000',
    borderRadius: 5,
  }
})

export default BottomTabs;