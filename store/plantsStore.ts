import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type PlantType = {
  id: string
  name: string
  wateringFrequencyDays: number
  lastWateredAtTimestamp?: number
  imageUri?: string
}

type AddPlantProps = {
  name: string
  wateringFrequencyDays: number
  imageUri?: string
}

type PlantsStore = {
  plants: PlantType[]
  addPlant: (plant: AddPlantProps) => void
  removePlant: (id: string) => void
  waterPlant: (id: string) => void
}

export const usePlantsStore = create(
  persist<PlantsStore>(
    (set) => ({
      plants: [],
      addPlant: async ({
        name,
        wateringFrequencyDays,
        imageUri,
      }: AddPlantProps) => {
        const savedImageUri = imageUri
          ? FileSystem.documentDirectory +
            `${new Date().getTime()}-${imageUri.split('/').slice(-1)[0]}`
          : undefined

        if (imageUri && savedImageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          })
        }

        const newPlant: PlantType = {
          id: new Date().toTimeString(),
          name,
          wateringFrequencyDays,
          imageUri: savedImageUri,
        }

        set((state) => {
          return {
            ...state,
            plants: [newPlant, ...state.plants],
          }
        })
      },
      removePlant: (id: string) => {
        set((state) => ({
          ...state,
          plants: state.plants.filter((plant) => plant.id !== id),
        }))
      },
      waterPlant: (id: string) => {
        set((state) => ({
          ...state,
          plants: state.plants.map((plant) =>
            plant.id === id
              ? {
                  ...plant,
                  lastWateredAtTimestamp: Date.now(),
                }
              : plant
          ),
        }))
      },
    }),
    {
      name: 'plantly-plants-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
