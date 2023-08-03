import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type FilterStyleProps = {
  isActive?: boolean
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;

  align-self: flex-start;
  padding: 8px 12px;

  ${({ theme, isActive }) =>
    isActive &&
    css`
      border-color: ${theme.colors['green-700']};
    `};
`

export const Label = styled.Text`
  text-transform: uppercase;
  line-height: 22.4px;

  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.sm};
    color: ${theme.colors.white};
  `}
`
