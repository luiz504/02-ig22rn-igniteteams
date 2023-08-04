import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { theme } from '@/styles'

import { Loading } from '@/components/Loading'

import { Routes } from '@/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })

  return (
    <ThemeProvider>
      {!fontsLoaded && <Loading />}

      {fontsLoaded && (
        <>
          <StatusBar
            style="inverted"
            translucent={false}
            backgroundColor={theme.colors['gray-600']}
          />
          <Routes />
        </>
      )}
    </ThemeProvider>
  )
}
