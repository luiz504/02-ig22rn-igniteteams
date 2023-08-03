import { FC } from 'react'
import { View } from 'react-native'

import { Container, Form, RowFilters, Counter } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'

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

      <RowFilters>
        <View style={{ flexDirection: 'row', flex: 1, overflow: 'scroll' }}>
          <Filter label="Team 1" isActive />
          <Filter label="Team 2" />
        </View>

        <Counter>2</Counter>
      </RowFilters>
    </Container>
  )
}
