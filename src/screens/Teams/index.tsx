import { FC, useState } from 'react'
import { FlatList } from 'react-native'

import { Container } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { GroupCard } from '@/components/GroupCard'
import { ListEmptyFB } from '@/components/ListEmptyFB'
import { Button } from '@/components/Button'

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

  return (
    <>
      <Container testID="wrapper">
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

        <Button style={{ marginVertical: 16 }} label="Create new Team" />
      </Container>
    </>
  )
}
