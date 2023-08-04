import { FC, useState } from 'react'

import { Content, Icon } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ContainerBase } from '@/components/ContainerBase'
import { useNavigation } from '@react-navigation/native'
import { createTeam } from '@/storage/teams/createTeam'
import { ZodError } from 'zod'

export const NewTeam: FC = () => {
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const handleCreateTeam = () => {
    try {
      const newTeam = createTeam(teamName)

      navigation.navigate('players', { team: newTeam })
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message)
      }
    }
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
