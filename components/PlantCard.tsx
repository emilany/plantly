import { PlantType } from '@/store/plantsStore'
import { colors, spacing } from '@/utils/theme'
import { StyleSheet, Text, View } from 'react-native'
import PlantlyImage from './PlantlyImage'

type Props = {
  plant: PlantType
}

export default function PlantCard({ plant }: Props) {
  return (
    <View style={styles.container}>
      <PlantlyImage size={100} />
      <View>
        <Text style={styles.heading}>{plant.name}</Text>
        <Text style={styles.description}>
          Water every {plant.wateringFrequencyDays}{' '}
          {plant.wateringFrequencyDays === 1 ? 'day' : 'days'}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 100,
    backgroundColor: colors.white,
    borderRadius: 6,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.grey,
  },
})
