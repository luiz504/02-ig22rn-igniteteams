import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { useFonts } from 'expo-font'

import { ThemeProvider } from '@/providers/ThemeProvider'

import { theme } from '@/styles'

import { Loading } from '@/components/Loading'
// import { NewGroup } from '@/screens/NewGroup'
// import { Teams } from './src/screens/Teams'
import { Team } from '@/screens/Team'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })

  return (
    <ThemeProvider>
      {!fontsLoaded && <Loading />}

      {fontsLoaded && (
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors['gray-600'],
            paddingHorizontal: 24,
          }}
          testID="app-wrapper"
        >
          <StatusBar
            style="inverted"
            translucent={false}
            backgroundColor={theme.colors['gray-600']}
          />

          {/* <Teams /> */}

          {/* <NewGroup /> */}

          <Team />
        </View>
      )}
    </ThemeProvider>
  )
}
