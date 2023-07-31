import { FC } from 'react'

import { Container, Content, Icon } from './styles'
import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'

export const NewGroup: FC = () => {
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon testID="users-icon" />

        <Highlight
          title="New Team"
          subtitle="Create a new Team to add members"
        />

        <Button label="Create" />
      </Content>
    </Container>
  )
}
