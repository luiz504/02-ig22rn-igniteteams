import { ComponentProps, FC } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Container, ButtonIconTypeStyleProps, Icon } from './styles'

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
