import { FC } from 'react'

import { Container, LoadingIndicator } from './styles'

export const Loading: FC = () => {
  return (
    <Container testID="container">
      <LoadingIndicator testID="loading-indicator" />
    </Container>
  )
}
