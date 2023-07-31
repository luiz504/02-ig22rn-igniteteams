import { FC } from 'react'

import { Container, Icon, Text } from './styles'
import { TouchableOpacityProps } from 'react-native'

interface GroupCardProps extends TouchableOpacityProps {
  name: string
}

export const GroupCard: FC<GroupCardProps> = ({ name, ...rest }) => {
  return (
    <Container {...rest}>
      <Icon testID="users-icon" />
      <Text> {name} </Text>
    </Container>
  )
}
