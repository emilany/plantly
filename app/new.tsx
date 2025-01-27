import { colors } from '@/utils/theme'
import { StyleSheet, Text, View } from 'react-native'

export default function NewScreen() {
  return (
    <View style={styles.container}>
      <Text>New plant</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
