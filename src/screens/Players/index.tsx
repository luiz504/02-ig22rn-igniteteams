import { FC, useMemo, useState } from 'react'
import { Alert, FlatList } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ZodError } from 'zod'

import { addPlayerByTeam } from '@/storage/players/addPlayersByTeam'
import { AppError } from '@/utils/AppError'

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

// import { getPlayersByTeam } from '@/storage/players/getPlayersByTeam'

type RouteParams = {
  team: {
    name: string
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

  const [playerName, setPlayerName] = useState('')

  const handleAddTeamPlayer = () => {
    const newPlayer = {
      name: playerName,
      team: team.name,
    }

    try {
      addPlayerByTeam(newPlayer, team.name)

      // const updatedTeam = getPlayersByTeam(team.name)
      // console.log('new', updatedTeam)
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('New Player', err.message)
      }
      if (err instanceof ZodError) {
        Alert.alert('New Player', err.errors[0].message)
      }
    }
  }

  const hasPlayersOnSelectedTeam = !!playerOfSelectedTeam.length

  return (
    <ContainerBase>
      <Header showBackButton />

      <Highlight
        title={team.name}
        subtitle="Add the people and split the teams"
      />

      <Form>
        <Input
          style={{ flex: 1 }}
          placeholder="Player Name"
          value={playerName}
          onChangeText={(value) => setPlayerName(value)}
          testID="player-name-input"
          onSubmitEditing={handleAddTeamPlayer}
        />

        <ButtonIcon
          iconName="add"
          onPress={handleAddTeamPlayer}
          testID="submit-btn"
        />
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
          // eslint-disable-next-line @typescript-eslint/no-empty-function
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
        testID={'remove-team-btn'}
      />
    </ContainerBase>
  )
}
