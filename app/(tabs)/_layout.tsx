import { useUserStore } from '@/store/userStore'
import { colors } from '@/utils/theme'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import { Redirect, Tabs } from 'expo-router'

const Layout = () => {
  const hasFinishedOnboarding = useUserStore(
    (state) => state.hasFinishedOnboarding
  )

  if (!hasFinishedOnboarding) return <Redirect href="/onboarding" />

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="leaf" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default Layout
