import { PlantlyButton } from '@/components/PlantlyButton'
import PlantlyImage from '@/components/PlantlyImage'
import { usePlantsStore } from '@/store/plantsStore'
import { colors, spacing } from '@/utils/theme'
import AntDesign from '@expo/vector-icons/AntDesign'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function NewScreen() {
  const router = useRouter()

  const [name, setName] = useState<string>()
  const [days, setDays] = useState<string>()
  const [error, setError] = useState<string | undefined>(undefined)
  const [imageUri, setImageUri] = useState<string>()

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

  const handleChooseImage = async () => {
    if (Platform.OS === 'web') return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) setImageUri(result.assets[0].uri)
  }

  const handleRemoveImage = () => setImageUri(undefined)

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.imageContainer}>
        {imageUri && (
          <TouchableOpacity
            onPress={handleRemoveImage}
            activeOpacity={0.8}
            style={styles.deleteButton}
          >
            <AntDesign name="closecircle" size={24} color={colors.grey} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleChooseImage} activeOpacity={0.8}>
          <PlantlyImage imageUri={imageUri} />
        </TouchableOpacity>
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
    position: 'relative',
    alignItems: 'center',
    marginBottom: spacing.md,
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
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
})
