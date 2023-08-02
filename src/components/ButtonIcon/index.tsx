import { ComponentProps, FC } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonIconTypeStyleProps, Icon } from './styles'
import { MaterialIcons } from '@expo/vector-icons'

type IconName = ComponentProps<typeof MaterialIcons>['name']

interface ButtonIconProps extends TouchableOpacityProps {
  variant?: ButtonIconTypeStyleProps
  iconName: IconName
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  iconName,
  variant = 'primary',
  testID,
  ...rest
}) => {
  return (
    <Container variant="primary" testID={testID} {...rest}>
      <Icon name={iconName} variant={variant} testID={`${testID}-icon`} />
    </Container>
  )
}
