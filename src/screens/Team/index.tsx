import { FC } from 'react'

import { Container, Form } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Input } from '@/components/Input'

export const Team: FC = () => {
  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title="[Team Name]"
        subtitle="Add the people and split the teams"
      />

      <Form>
        <Input style={{ flex: 1 }} />

        <ButtonIcon iconName="add" />
      </Form>
    </Container>
  )
}
