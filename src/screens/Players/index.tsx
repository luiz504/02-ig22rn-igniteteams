import { FC, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ZodError } from 'zod'

import { addPlayerByGroup } from '@/storage/players/addPlayerByGroup'
import { getPlayerByGroupAndTeam } from '@/storage/players/getPlayersGetByGroupAndTeam'
import { removePlayerByGroup } from '@/storage/players/removePlayerByGroup'

import { AppError } from '@/utils/AppError'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { ButtonIcon } from '@/components/ButtonIcon'
import { Input } from '@/components/Input'
import { Filter } from '@/components/Filter'
import { PlayerCard } from '@/components/PlayerCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'
import { ContainerBase } from '@/components/ContainerBase'

import { Form, RowFilters, Counter } from './styles'

type RouteParams = {
  group: {
    name: string
  }
}
export const Players: FC = () => {
  const { group } = useRoute().params as RouteParams

  //* Teams
  const [teams] = useState([
    {
      name: 'Team A',
    },
    { name: 'Team B' },
  ])
  const [activeTeam, setActiveTeam] = useState<string | null>(teams[0].name)

  //* Players

  const [players, setPlayers] = useState(() => {
    if (!activeTeam || !group.name) return []

    return getPlayerByGroupAndTeam(group.name, activeTeam)
  })

  const fetchPlayersByTeam = (team: string | null) => {
    if (!team) return
    try {
      const players = getPlayerByGroupAndTeam(group.name, team)
      setPlayers(players)
    } catch (err) {
      Alert.alert('Fetch Players', 'Fail to fetch players from team.')
    }
  }

  const handleSelectTeam = (team: string) => {
    setActiveTeam(team)
    fetchPlayersByTeam(team)
  }

  //* Add Players
  const [playerName, setPlayerName] = useState('')
  const inputRef = useRef<TextInput>(null)

  const handleAddTeamPlayer = () => {
    if (!group.name || !activeTeam) return

    const newPlayer = {
      name: playerName,
      team: activeTeam,
    }

    try {
      addPlayerByGroup(newPlayer, group.name)
      const updatedPlayers = getPlayerByGroupAndTeam(group.name, activeTeam)
      setPlayerName('')
      inputRef.current?.blur()
      setPlayers(updatedPlayers)
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert('New Player', err.message)
      }
      if (err instanceof ZodError) {
        Alert.alert('New Player', err.errors[0].message)
      }
    }
  }

  const hasPlayersOnSelectedTeam = !!players.length

  //* Delete Players
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleDeletePlayer = (playerName: string) => {
    try {
      removePlayerByGroup(playerName, group.name)

      fetchPlayersByTeam(activeTeam)
    } catch (err) {
      Alert.alert('Remove Player', 'Failed to remove this player')
    }
  }

  return (
    <ContainerBase>
      <Header showBackButton />

      <Highlight
        title={group.name}
        subtitle="Add players and split the teams"
      />

      <Form>
        <Input
          ref={inputRef}
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
              onPress={() => handleSelectTeam(item.name)}
            />
          )}
          horizontal
        />

        <Counter>2</Counter>
      </RowFilters>

      <FlatList
        data={players}
        contentContainerStyle={[
          { rowGap: 12, paddingBottom: 32 },
          !hasPlayersOnSelectedTeam && {
            flex: 1,
          },
        ]}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            label={item.name}
            onDeletePress={() => handleDeletePlayer(item.name)}
          />
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
