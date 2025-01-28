import PlantCard from '@/components/PlantCard'
import { PlantlyButton } from '@/components/PlantlyButton'
import { usePlantsStore } from '@/store/plantsStore'
import { colors, spacing } from '@/utils/theme'
import { useRouter } from 'expo-router'
import { FlatList, StyleSheet } from 'react-native'

export default function App() {
  const router = useRouter()

  const plants = usePlantsStore((state) => state.plants)

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        plants.length === 0 ? styles.emptyContentContainer : undefined,
      ]}
      data={plants}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <PlantCard plant={item} />}
      ListEmptyComponent={
        <PlantlyButton
          title="Add your first plant"
          onPress={() => router.navigate('/new')}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
})
