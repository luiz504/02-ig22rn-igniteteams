import { FC } from 'react'
import { useNavigation } from '@react-navigation/native'

import logo from '@assets/logo.png'

import { Container, BackIcon, Logo, BackButton } from './styles'

type HeaderProps = {
  showBackButton?: boolean
}

export const Header: FC<HeaderProps> = ({ showBackButton = false }) => {
  const navigation = useNavigation()

  const handleGoHome = () => {
    navigation.navigate('groups')
  }

  return (
    <Container testID="header-container">
      {showBackButton && (
        <BackButton testID="btn-navigation" onPress={handleGoHome}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logo} alt="Logo" testID="logo" />
    </Container>
  )
}
