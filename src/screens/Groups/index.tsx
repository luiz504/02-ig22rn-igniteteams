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

  const navigation = useNavigation()

  const handleNavigateToPlayersScreen = (groupName: string) => {
    navigation.navigate('players', { group: { name: groupName } })
  }

  const handleNewGroup = () => {
    navigation.navigate('new-group')
  }

  const isGroupEmpty = !groups.length

  useFocusEffect(
    useCallback(() => {
      const storedGroup = getAllGroups()
      setGroups(storedGroup)
    }, []),
  )

  return (
    <>
      <ContainerBase testID="wrapper-groups">
        <Header />
        <Highlight title={'Groups'} subtitle={'Play with your group'} />

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
          contentContainerStyle={[{ rowGap: 12 }, isGroupEmpty && { flex: 1 }]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <ListEmptyFB message="How about creating the first group?" />
          }
        />

        <Button
          style={{ marginVertical: 12 }}
          label="Create new group"
          onPress={handleNewGroup}
          testID="btn-create-group"
        />
      </ContainerBase>
    </>
  )
}
