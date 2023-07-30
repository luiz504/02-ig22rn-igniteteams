import { FC } from 'react'
import { Image } from 'react-native'

import Logo from '@assets/logo.png'
import { Container, Text } from './styles'

export const Groups: FC = () => {
  return (
    <Container testID="wrapper">
      <Text> Groups </Text>
      <Image source={Logo} alt="hello" />
    </Container>
  )
}
