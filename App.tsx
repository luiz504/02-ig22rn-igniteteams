import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Groups } from './src/screens/Groups'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent={false} backgroundColor="#fff" />
      <Groups />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
