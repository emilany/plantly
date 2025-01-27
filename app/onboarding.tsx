import { PlantlyButton } from '@/components/PlantlyButton'
import { useUserStore } from '@/store/userStore'
import { colors } from '@/utils/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet } from 'react-native'

export default function OnboardingScreen() {
  const router = useRouter()

  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded)

  const handlePress = () => {
    toggleHasOnboarded()
    router.replace('/')
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[colors.green, colors.appleGreen, colors.limeGreen]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <PlantlyButton title="Let me in" onPress={handlePress} />
    </LinearGradient>
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
