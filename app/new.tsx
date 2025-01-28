import { PlantlyButton } from '@/components/PlantlyButton'
import PlantlyImage from '@/components/PlantlyImage'
import { usePlantsStore } from '@/store/plantsStore'
import { colors, spacing } from '@/utils/theme'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function NewScreen() {
  const router = useRouter()

  const [name, setName] = useState<string>()
  const [days, setDays] = useState<string>()
  const [error, setError] = useState<string | undefined>(undefined)

  const addPlant = usePlantsStore((state) => state.addPlant)

  const handlePress = () => {
    if (!name) {
      setError('Give your plant a name')
      return
    }

    if (!days) {
      setError(`How often does ${name} get watered?`)
      return
    }

    addPlant(name, Number(days))
    router.navigate('/')
  }

  const handleSetName = (value: string) => {
    setName(value)
    setError(undefined)
  }

  const handleSetDays = (value: string) => {
    setDays(value)
    setError(undefined)
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.imageContainer}>
        <PlantlyImage />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={handleSetName}
          placeholder="E.g. Casper the Cactus"
          style={styles.textInput}
          autoCapitalize="words"
          returnKeyType="next"
        />
      </View>

      <View style={styles.formRow}>
        <Text style={styles.label}>Watering Frequency (every x days)</Text>
        <TextInput
          value={days}
          onChangeText={handleSetDays}
          placeholder="E.g. 6"
          style={styles.textInput}
          keyboardType="number-pad"
          returnKeyType="done"
          // FIXME ongoing bug for react-native where numeric types don't fire this
          onSubmitEditing={handlePress}
        />
      </View>

      <PlantlyButton title="Add plant" onPress={handlePress} />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainer: {
    padding: spacing.lg,
  },
  imageContainer: {
    alignItems: 'center',
  },
  formRow: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 6,
    padding: spacing.md,
  },
  errorText: {
    color: colors.red,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
})
