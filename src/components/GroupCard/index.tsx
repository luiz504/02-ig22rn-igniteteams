import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Icon, Text } from './styles'

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
