import { FC } from 'react'

import { Container, Heading, Text } from './styles'
type HighlighProps = {
  title: string
  subtitle: string
}
export const Highlight: FC<HighlighProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <Heading>{title}</Heading>
      <Text>{subtitle}</Text>
    </Container>
  )
}
