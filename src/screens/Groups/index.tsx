import { FC } from 'react'
import { Image } from 'react-native'

import Logo from '@assets/logo.png'
import { Container, Text } from './styles'
import { Header } from '@/components/Header'

export const Groups: FC = () => {
  return (
    <>
      <Header />

      <Container testID="wrapper">
        <Text> Groups </Text>
        <Image source={Logo} alt="hello" />
      </Container>
    </>
  )
}
