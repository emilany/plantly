import { useUserStore } from '@/store/userStore'
import { colors, spacing } from '@/utils/theme'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import { Link, Redirect, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

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
          headerRight: () => (
            <Link href="/new" asChild>
              <Pressable hitSlop={20} style={{ marginRight: spacing.md }}>
                <Entypo
                  name="circle-with-plus"
                  size={24}
                  color={colors.green}
                />
              </Pressable>
            </Link>
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
