import { FC, useRef, useState } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ZodError } from 'zod'

import { addPlayerByGroup } from '@/storage/players/addPlayerByGroup'
import { getPlayerByGroupAndTeam } from '@/storage/players/getPlayersByGroupAndTeam'
import { deletePlayerByGroup } from '@/storage/players/deletePlayerByGroup'
import { deleteGroupByName } from '@/storage/groups/deleteGroupByName'

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

import { TEAMS } from './constants'

type RouteParams = {
  group: {
    name: string
  }
}
export const Players: FC = () => {
  const { group } = useRoute().params as RouteParams
  const navigator = useNavigation()
  //* Teams
  const [teams] = useState(TEAMS)
  const [activeTeam, setActiveTeam] = useState<string>(teams[0].name)

  //* Players

  const [players, setPlayers] = useState(() => {
    return getPlayerByGroupAndTeam(group.name, activeTeam)
  })

  const fetchPlayersByTeam = (team: string) => {
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
      let errorMsg = 'Fail to add a new player'

      if (err instanceof AppError) {
        errorMsg = err.message
      }
      if (err instanceof ZodError) {
        errorMsg = err.errors[0].message
      }
      Alert.alert('New Player', errorMsg)
    }
  }

  const hasPlayersOnSelectedTeam = !!players.length

  //* Delete Players
  const handleDeletePlayer = (playerName: string) => {
    try {
      deletePlayerByGroup(playerName, group.name)

      fetchPlayersByTeam(activeTeam)
    } catch (err) {
      Alert.alert('Delete Player', 'Failed to delete this player')
    }
  }

  //* Delete Group
  const groupRemove = () => {
    try {
      deleteGroupByName(group.name)
      navigator.navigate('groups')
    } catch (err) {
      Alert.alert('Delete Player', 'Failed to delete this group')
    }
  }

  const handleDeleteGroup = () => {
    Alert.alert('Delete Action', 'Are you sure about deleting this Group?', [
      {
        text: 'Yes, Delete it',
        onPress: groupRemove,
        style: 'destructive',
      },
      { text: 'Cancel' },
    ])
  }

  return (
    <ContainerBase>
      <Header showBackButton />

      <Highlight
        title={group.name}
        subtitle="Add players and divide the teams"
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
          keyboardAppearance="dark"
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
              testID={`team-selector`}
            />
          )}
          horizontal
        />

        {!!players.length && (
          <Counter testID="players-counter">{players.length}</Counter>
        )}
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
            testID="player-card"
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmptyFB
            message="This team currently has no players."
            testID="empty-feedback"
          />
        )}
      />

      <Button
        style={{ marginBottom: 12 }}
        label="Delete Group"
        type="secondary"
        testID={'delete-group-btn'}
        onPress={handleDeleteGroup}
      />
    </ContainerBase>
  )
}
