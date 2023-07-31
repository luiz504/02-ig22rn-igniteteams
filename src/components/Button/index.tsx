import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonTypeStyleProps, Label } from './styles'

interface ButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  label: string
  type?: ButtonTypeStyleProps
}

export const Button: FC<ButtonProps> = ({
  label,
  type = 'primary',
  ...rest
}) => {
  return (
    <Container type={type} {...rest}>
      <Label>{label}</Label>
    </Container>
  )
}
