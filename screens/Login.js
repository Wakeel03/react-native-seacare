// components/login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { auth } from '../database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Logo from '../components/Logo';

const Login = () => {
  
  const navigation  = useNavigation();
  
  const [state, setState] = useState({
      email: '', 
      password: '',
      isLoading: false
    })
  
  const updateInputVal = (val, prop) => {
    const newState = { ...state };
    newState[prop] = val;
    setState(newState);
  }

  const userLogin = () => {
    if(state.email === '' && state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      setState({
        ...state,
        isLoading: true,
      })
      
      signInWithEmailAndPassword(auth, state.email, state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        navigation.navigate('BottomTabs')
      })
      .catch(error => { console.error(error); setState({ errorMessage: error.message })})
    }
  }
  
  if(state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
  return (
      <View style={styles.container}>  
        <Logo />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={state.email}
          onChangeText={(val) => updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={state.password}
          onChangeText={(val) => updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => userLogin()}
        />   
        <Text 
          style={styles.loginText}
          onPress={() => navigation.navigate('SignUp')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },

  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});


export default Login;