/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useMemo, useState } from 'react'
import { FlatList } from 'react-native'

import { Form, RowFilters, Counter } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { PlayerCard } from '@/components/PlayerCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'
import { ContainerBase } from '@/components/ContainerBase'
import { useRoute } from '@react-navigation/native'

type RouteParams = {
  team: {
    name: string
    id: string
  }
}
export const Players: FC = () => {
  const { team } = useRoute().params as RouteParams

  const [teams] = useState([
    {
      name: 'Team 1',
      players: ['Luiz', 'Alexandre', 'Vania', 'Renato', 'Renata', 'Isablea'],
    },
    { name: 'Team 2', players: ['Marco', 'Vini'] },
    { name: 'Team 3', players: [] },
    { name: 'Team 4', players: ['Luiz', 'Alexandre'] },
    { name: 'Team 5', players: ['Marco', 'Vini'] },
    { name: 'Team 6', players: [] },
  ])
  const [activeTeam, setActiveTeam] = useState<string | null>(null)

  const playerOfSelectedTeam = useMemo(() => {
    return teams.find((team) => team.name === activeTeam)?.players || []
  }, [teams, activeTeam])

  const hasPlayersOnSelectedTeam = !!playerOfSelectedTeam.length

  return (
    <ContainerBase>
      <Header showBackButton />

      <Highlight
        title={team.name}
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
          showsHorizontalScrollIndicator={false}
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

      <FlatList
        data={playerOfSelectedTeam}
        contentContainerStyle={[
          { rowGap: 12, paddingBottom: 32 },
          !hasPlayersOnSelectedTeam && {
            flex: 1,
          },
        ]}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard label={item} onDeletePress={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmptyFB message="There are no member on this team" />
        )}
      />

      <Button
        style={{ marginBottom: 24 }}
        label="Remove Team"
        type="secondary"
        testID={'btn-remove-team'}
      />
    </ContainerBase>
  )
}
