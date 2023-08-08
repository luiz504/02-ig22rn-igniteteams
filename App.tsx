import { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { Routes } from '@/routes'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })

  useLayoutEffect(() => {
    fontsLoaded && SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <ThemeProvider>
      {
        <>
          <StatusBar style="light" />
          <Routes />
        </>
      }
    </ThemeProvider>
  )
}
