import { FC, useState } from 'react'

import { Content, Icon } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ContainerBase } from '@/components/ContainerBase'
import { useNavigation } from '@react-navigation/native'

export const NewTeam: FC = () => {
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const handleCreateTeam = () => {
    if (!teamName.length) {
      return setError('Name is required to create new Team')
    }
    if (teamName.length < 3) {
      return setError('Name must have at least 3 letters to create new Team')
    }

    const newTeam = {
      id: String(Math.round(Math.random() * teamName.length * Date.now())),
      name: teamName,
    }

    navigation.navigate('players', { team: newTeam })
  }

  return (
    <ContainerBase>
      <Header showBackButton />

      <Content>
        <Icon testID="users-icon" />

        <Highlight
          title="New Team"
          subtitle="Create a new Team to add members"
        />

        <Input
          placeholder="New Team name"
          value={teamName}
          onChangeText={(e) => setTeamName(e)}
          keyboardAppearance="dark"
          autoCorrect={false}
          onFocus={() => setError('')}
          hasError={!!error}
        />

        <Button
          style={{ marginVertical: 20 }}
          label="Create"
          onPress={handleCreateTeam}
        />
      </Content>
    </ContainerBase>
  )
}
