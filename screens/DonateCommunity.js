import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import StackScreenHeader from '../components/StackScreenHeader'
import CustomInput from '../components/CustomInput'
import ButtonFull from '../components/ButtonFull'

const DonateCommunity = ( { route, navigation }) => {

  const { community } = route.params
  const [amount, setAmount] = useState(0)

  return (
    <View style={styles.container}>
        <StackScreenHeader title={`Donate to ${community.name}`} />

        <CustomInput
            label={'Enter the amount to donate in Rs'}
            placeholder="Amount"
            onChangeText={newAmount => setAmount([newAmount])}
            defaultValue={amount}
        />

        <ButtonFull text='Donate' onPress={() => navigation.navigate('Home')}  backgroundColor='#626FDB'/>

        {/* <ButtonFull text='Donate' onPress={() => { Alert.alert('Success',
            'Donation Successful',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => navigation.navigate('Home')},  
            ] 
        );  }} backgroundColor='#626FDB' /> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

export default DonateCommunity