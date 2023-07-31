import { FC, useState } from 'react'

import { Container } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { GroupCard } from '@/components/GroupCard'
import { FlatList } from 'react-native'

export const Groups: FC = () => {
  const [groups] = useState(['Groups 1', 'Groups 2', 'Groups 3'])
  return (
    <>
      <Container testID="wrapper">
        <Header />
        <Highlight
          title={'New Team'}
          subtitle={'Create a new Team to add members'}
        />

        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <GroupCard name={item} />}
          contentContainerStyle={{ rowGap: 12 }}
        />
      </Container>
    </>
  )
}
