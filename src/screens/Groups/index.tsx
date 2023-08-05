import { FC, useCallback, useState } from 'react'
import { FlatList } from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { getAllGroups } from '@/storage/groups/getallGroups'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { GroupCard } from '@/components/GroupCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'
import { ContainerBase } from '@/components/ContainerBase'

export const Groups: FC = () => {
  const [groups, setGroups] = useState<string[]>([])

  useFocusEffect(
    useCallback(() => {
      const teams = getAllGroups()
      setGroups(teams)
    }, []),
  )

  const navigation = useNavigation()

  const handleNavigateToPlayersScreen = (groupName: string) => {
    const teamExists = groups.includes(groupName)

    if (teamExists) {
      navigation.navigate('players', { group: { name: groupName } })
    }
  }

  const handleNewGroup = () => {
    navigation.navigate('new-group')
  }

  return (
    <>
      <ContainerBase testID="wrapper-groups">
        <Header />
        <Highlight
          title={'New Group'}
          subtitle={'Create a new Group to add members'}
        />

        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard
              name={item}
              onPress={() => handleNavigateToPlayersScreen(item)}
              testID={`group-card-${item}`}
            />
          )}
          contentContainerStyle={{ rowGap: 12 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmptyFB message="How about creating the first group?" />
          }
        />

        <Button
          style={{ marginVertical: 16 }}
          label="Create new Group"
          onPress={handleNewGroup}
          testID="btn-create-group"
        />
      </ContainerBase>
    </>
  )
}
