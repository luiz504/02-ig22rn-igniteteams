import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'styled-components/native'

import { Teams } from '@/screens/Teams'
import { NewTeam } from '@/screens/NewTeam'
import { Players } from '@/screens/Players'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const theme = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors['gray-600'] }}>
      <Navigator
        initialRouteName="teams"
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      >
        <Screen name="teams" component={Teams} />
        <Screen name="new-team" component={NewTeam} />
        <Screen name="players" component={Players} />
      </Navigator>
    </View>
  )
}
