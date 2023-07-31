import { FC } from 'react'

import { Container } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'

export const Groups: FC = () => {
  const title = 'New Team'
  const subTitle = 'Create a new Team to add members'
  return (
    <>
      <Header />
      <Highlight title={title} subtitle={subTitle} />

      <Container testID="wrapper"></Container>
    </>
  )
}
