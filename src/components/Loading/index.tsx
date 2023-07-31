import { FC } from 'react'

import { Container, LoadingIndicator } from './styles'

export const Loading: FC = () => {
  return (
    <Container>
      <LoadingIndicator />
    </Container>
  )
}
