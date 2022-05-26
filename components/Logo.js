import { View, Text, StyleSheet, Image } from 'react-native'
import { FONTS } from '../constants';

const Logo = () => {
  return (
    <View style={{ width: '100%', alignItems: 'center'  }}>
        <Image source={require('../assets/images/SeaCareLogo.png')} style={{ marginBottom: 20, width: 80, height: 80  }} resizeMode='cover'/>
        <Text style={styles.name}>SeaCare</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.medium,
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60,
  }
})

export default Logo