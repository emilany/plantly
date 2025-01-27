import { useUserStore } from '@/store/userStore'
import { colors } from '@/utils/theme'
import { useRouter } from 'expo-router'
import { Button, StyleSheet, View } from 'react-native'

export default function OnboardingScreen() {
  const router = useRouter()

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded)

  const handlePress = () => {
    toggleHasOnboarded()
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      <Button title="Let me in" onPress={handlePress} />
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
