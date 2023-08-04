import { FC, useState } from 'react'
import { FlatList } from 'react-native'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { GroupCard } from '@/components/GroupCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'
import { ContainerBase } from '@/components/ContainerBase'
import { useNavigation } from '@react-navigation/native'

export const Teams: FC = () => {
  const [teams] = useState([
    //
    'Groups 1',
    'Groups 2',
    'Groups 3',
    'Groups 5',
    'Groups 6',
    'Groups 7',
  ])

  const navigation = useNavigation()

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
          renderItem={({ item }) => <GroupCard name={item} />}
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
