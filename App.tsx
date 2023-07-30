import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, View } from 'react-native'
import { Groups } from './src/screens/Groups'

import { useFonts } from 'expo-font'
import { ThemeProvider } from '@/providers/ThemeProvider'

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })

  if (!fontsLoaded) return <ActivityIndicator />

  return (
    <ThemeProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar style="auto" translucent={false} backgroundColor="#fff" />
        <Groups />
      </View>
    </ThemeProvider>
  )
}
