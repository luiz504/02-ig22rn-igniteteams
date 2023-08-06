import { Alert, TextInput } from 'react-native'
import { FC, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ZodError } from 'zod'

import { createGroup } from '@/storage/groups/createGroup'

import { AppError } from '@/utils/AppError'

import { Content, Icon } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ContainerBase } from '@/components/ContainerBase'

export const NewGroup: FC = () => {
  const inputRef = useRef<TextInput>(null)

  const [groupName, setGroupName] = useState('')
  const [error, setError] = useState('')

  const navigation = useNavigation()

  const handleCreateGroup = () => {
    try {
      const newTeam = createGroup(groupName)

      navigation.navigate('players', { group: { name: newTeam } })
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
          title="New Group"
          subtitle="Create a new Group to add members"
        />

        <Input
          ref={inputRef}
          placeholder="New Group name"
          value={groupName}
          onChangeText={(e) => setGroupName(e)}
          keyboardAppearance="dark"
          autoCorrect={false}
          onFocus={() => setError('')}
          hasError={!!error}
          testID="input-new-group"
          onSubmitEditing={handleCreateGroup}
        />

        <Button
          style={{ marginVertical: 20 }}
          label="Create"
          onPress={handleCreateGroup}
          testID="submit-btn"
        />
      </Content>
    </ContainerBase>
  )
}
