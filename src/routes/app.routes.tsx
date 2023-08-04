import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Teams } from '@/screens/Teams'
import { NewTeam } from '@/screens/NewTeam'
import { Team } from '@/screens/Team'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator initialRouteName="teams" screenOptions={{ headerShown: false }}>
      <Screen name="teams" component={Teams} />
      <Screen name="new-team" component={NewTeam} />
      <Screen name="team" component={Team} />
    </Navigator>
  )
}
