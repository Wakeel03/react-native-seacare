import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../constants';

const Logo = () => {
  return (
    <View>
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