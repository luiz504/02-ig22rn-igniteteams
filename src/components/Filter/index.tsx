import { FC } from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Label, FilterStyleProps } from './styles'

interface FilterProps extends TouchableOpacityProps, FilterStyleProps {
  label: string
}
export const Filter: FC<FilterProps> = ({
  label,
  isActive,
  testID,
  ...rest
}) => {
  return (
    <Container testID={testID} isActive={isActive} {...rest}>
      <Label testID={`${testID}-label`}>{label}</Label>
    </Container>
  )
}
