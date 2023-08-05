import { FC, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { GroupCard } from '@/components/GroupCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'
import { ContainerBase } from '@/components/ContainerBase'
import { getAllTeams } from '@/storage/teams/getallTeams'

export const Teams: FC = () => {
  const [teams, setTeams] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      const teams = getAllTeams()
      setTeams(teams)
    }, []),
  )

  const navigation = useNavigation()

  const handleNavigateToTeamScreen = (teamName: string) => {
    const teamExists = teams.includes(teamName)

    if (teamExists) {
      navigation.navigate('players', { team: { name: teamName } })
    }
  }

  const handleNewGroup = () => {
    navigation.navigate('new-team')
  }

  return (
    <>
      <ContainerBase testID="wrapper-teams">
        <Header />
        <Highlight
          title={'New Team'}
          subtitle={'Create a new Team to add members'}
        />

        <FlatList
          data={teams}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard
              name={item}
              onPress={() => handleNavigateToTeamScreen(item)}
              testID={`team-card-${item}`}
            />
          )}
          contentContainerStyle={{ rowGap: 12 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmptyFB message="How about creating the first team?" />
          }
        />

        <Button
          style={{ marginVertical: 16 }}
          label="Create new Team"
          onPress={handleNewGroup}
          testID="btn-create-team"
        />
      </ContainerBase>
    </>
  )
}
