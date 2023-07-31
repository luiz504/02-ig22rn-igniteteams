import { FC } from 'react'
import logo from '@assets/logo.png'

import { Container, Logo } from './styles'

export const Header: FC = () => {
  return (
    <Container>
      <Logo source={logo} alt="Logo" testID="logo" />
    </Container>
  )
}
