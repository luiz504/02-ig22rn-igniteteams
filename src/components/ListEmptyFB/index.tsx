import { FC } from 'react'

import { Container, Message } from './styles'

type ListEmptyFBProps = {
  message: string
}
export const ListEmptyFB: FC<ListEmptyFBProps> = ({ message }) => {
  return (
    <Container>
      <Message> {message} </Message>
    </Container>
  )
}
