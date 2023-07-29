import { FC } from 'react'
import { Image, Text, View } from 'react-native'

import Logo from '@assets/logo.png'

export const Groups: FC = () => {
  return (
    <View testID="wrapper">
      <Text> Groups </Text>
      <Image source={Logo} alt="hello" />
    </View>
  )
}
