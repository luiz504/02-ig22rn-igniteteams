import { FC } from 'react'

import { Container, Label, Icon } from './styles'
import { ButtonIcon } from '../ButtonIcon'

interface PlayerCardProps {
  testID?: string
  label: string
  onDeletePress: () => void
}
export const PlayerCard: FC<PlayerCardProps> = ({
  label,
  testID,
  onDeletePress,
}) => {
  return (
    <Container testID={testID}>
      <Icon name="person" testID={`${testID}-icon`} />
      <Label testID={`${testID}-label`}> {label} </Label>

      <ButtonIcon
        testID={`${testID}-delete-btn`}
        iconName="close"
        variant="secondary"
        onPress={onDeletePress}
      />
    </Container>
  )
}
