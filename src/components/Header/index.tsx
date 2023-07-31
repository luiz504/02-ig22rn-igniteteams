import { FC } from 'react'

import logo from '@assets/logo.png'

import { Container, BackIcon, Logo, BackButton } from './styles'

type HeaderProps = {
  showBackButton?: boolean
}

export const Header: FC<HeaderProps> = ({ showBackButton = true }) => {
  return (
    <Container testID="header-container">
      {showBackButton && (
        <BackButton testID="back-btn">
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logo} alt="Logo" testID="logo" />
    </Container>
  )
}
