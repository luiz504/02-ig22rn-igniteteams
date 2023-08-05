import { Alert, TextInput } from 'react-native'
import { FC, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ZodError } from 'zod'

import { createTeam } from '@/storage/teams/createTeam'

import { AppError } from '@/utils/AppError'

import { Content, Icon } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ContainerBase } from '@/components/ContainerBase'

export const NewTeam: FC = () => {
  const inputRef = useRef<TextInput>(null)

  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const handleCreateTeam = () => {
    try {
      const newTeam = createTeam(teamName)

      navigation.navigate('players', { team: { name: newTeam } })
    } catch (err) {
      if (err instanceof ZodError) {
        inputRef.current?.blur()
        setError(err.errors[0].message)
        Alert.alert('New Group Fail', err.errors[0].message)
      }
      if (err instanceof AppError) {
        Alert.alert('New Group Fail', err.message)
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
          ref={inputRef}
          placeholder="New Team name"
          value={teamName}
          onChangeText={(e) => setTeamName(e)}
          keyboardAppearance="dark"
          autoCorrect={false}
          onFocus={() => setError('')}
          hasError={!!error}
          testID="input-new-team"
        />

        <Button
          style={{ marginVertical: 20 }}
          label="Create"
          onPress={handleCreateTeam}
          testID="submit-btn"
        />
      </Content>
    </ContainerBase>
  )
}
