import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export type ButtonIconTypeStyleProps = 'primary' | 'secondary'

type Props = {
  variant: ButtonIconTypeStyleProps
}

export const Container = styled(TouchableOpacity)<Props>`
  padding: 16px;
  justify-content: center;
  align-items: center;
`
export const Icon = styled(MaterialIcons).attrs<Props>(
  ({ theme, variant }) => ({
    size: 24,
    color:
      variant === 'primary'
        ? theme.colors['green-700']
        : theme.colors['red-700'],
  }),
)``
