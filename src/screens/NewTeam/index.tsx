import { FC } from 'react'

import { Content, Icon } from './styles'

import { Header } from '@/components/Header'
import { Highlight } from '@/components/Highlight'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ContainerBase } from '@/components/ContainerBase'

export const NewTeam: FC = () => {
  return (
    <ContainerBase>
      <Header showBackButton />

      <Content>
        <Icon testID="users-icon" />

        <Highlight
          title="New Team"
          subtitle="Create a new Team to add members"
        />

        <Input placeholder="New Team name" />

        <Button style={{ marginVertical: 20 }} label="Create" />
      </Content>
    </ContainerBase>
  )
}
