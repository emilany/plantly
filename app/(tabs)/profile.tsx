import { useUserStore } from '@/store/userStore'
import { colors } from '@/utils/theme'
import { useRouter } from 'expo-router'
import { Button, StyleSheet, View } from 'react-native'

export default function Profile() {
  const router = useRouter()

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded)

  const handlePress = () => {
    toggleHasOnboarded()
    router.replace('/onboarding')
  }

  return (
    <View style={styles.container}>
      <Button title="Back to onboarding" onPress={handlePress} />
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
})
