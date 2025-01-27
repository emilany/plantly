import { colors, spacing } from '@/utils/theme'
import * as Haptics from 'expo-haptics'
import { Platform, Pressable, StyleSheet, Text } from 'react-native'

type Props = {
  title: string
  onPress: () => void
}

export function PlantlyButton({ title, onPress }: Props) {
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
    onPress()
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : undefined,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    backgroundColor: colors.green,
  },
  buttonPressed: {
    backgroundColor: colors.leafyGreen,
  },
})
