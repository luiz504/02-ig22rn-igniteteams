import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTheme } from 'styled-components/native'

import { Groups } from '@/screens/Groups'
import { NewGroup } from '@/screens/NewGroup'
import { Players } from '@/screens/Players'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  const theme = useTheme()
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors['gray-600'] }}>
      <Navigator
        initialRouteName="groups"
        screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
      >
        <Screen name="groups" component={Groups} />
        <Screen name="new-group" component={NewGroup} />
        <Screen name="players" component={Players} />
      </Navigator>
    </View>
  )
}
