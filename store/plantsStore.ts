import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type PlantType = {
  id: string
  name: string
  wateringFrequencyDays: number
  lastWateredAtTimestamp?: number
}

type PlantsStore = {
  plants: PlantType[]
  addPlant: (name: string, wateringFrequencyDays: number) => void
  removePlant: (id: string) => void
  waterPlant: (id: string) => void
}

export const usePlantsStore = create(
  persist<PlantsStore>(
    (set) => ({
      plants: [],
      addPlant: (name: string, wateringFrequencyDays: number) => {
        set((state) => {
          const plant: PlantType = {
            id: new Date().toTimeString(),
            name,
            wateringFrequencyDays,
          }
          return {
            ...state,
            plants: [plant, ...state.plants],
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
