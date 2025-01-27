import { Image } from 'expo-image'
import { useWindowDimensions } from 'react-native'

export default function PlantlyImage() {
  const { width } = useWindowDimensions()

  const imageSize = Math.min(width / 1.5, 400)

  return (
    <Image
      source={require('@/assets/plantly.png')}
      contentFit="cover"
      style={{ width: imageSize, height: imageSize }}
    />
  )
}
