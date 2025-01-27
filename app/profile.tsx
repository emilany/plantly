import { colors } from '@/utils/theme'
import { StyleSheet, Text, View } from 'react-native'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: 24,
  },
})
