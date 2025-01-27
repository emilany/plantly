import { PlantlyButton } from '@/components/PlantlyButton'
import PlantlyImage from '@/components/PlantlyImage'
import { useUserStore } from '@/store/userStore'
import { colors, spacing } from '@/utils/theme'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

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
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Plantly</Text>
        <Text style={styles.tagline}>
          Keep your plants healthy and hydrated
        </Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="Let me in" onPress={handlePress} />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textContainer: {
    paddingHorizontal: spacing.lg,
  },
  heading: {
    color: colors.white,
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  tagline: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
  },
})
