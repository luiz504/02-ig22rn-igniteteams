import { FC } from 'react'

import { Container, Message } from './styles'

type ListEmptyFBProps = {
  message: string
  testID?: string
}
export const ListEmptyFB: FC<ListEmptyFBProps> = ({ message, testID }) => {
  return (
    <Container testID={testID}>
      <Message> {message} </Message>
    </Container>
  )
}
