import { FC, useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, RowFilters, Counter } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'

export const Team: FC = () => {
  const [activeTeam, setActiveTeam] = useState<string | null>(null)
  const [teams] = useState([
    { name: 'Team 1', players: ['Luiz', 'Alexandre'] },
    { name: 'Team 2', players: ['Marco', 'Vini'] },
    { name: 'Team 3', players: [] },
    { name: 'Team 4', players: ['Luiz', 'Alexandre'] },
    { name: 'Team 5', players: ['Marco', 'Vini'] },
    { name: 'Team 6', players: [] },
  ])
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
        <FlatList
          data={teams}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Filter
              label={item.name}
              isActive={item.name === activeTeam}
              onPress={() => setActiveTeam(item.name)}
            />
          )}
          horizontal
        />

        <Counter>2</Counter>
      </RowFilters>
    </Container>
  )
}
