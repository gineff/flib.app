import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import 'react-native-reanimated'
import Drawer from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useColorScheme } from '@/hooks/useColorScheme'
import { DrawerContent } from '@/components/drawerContent/DrawerContent'
import { DrawScreens } from '@/constants/DrawScreens'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function DrawerLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={DrawerContent}
          screenOptions={{ headerShown: false }}
        />
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}
