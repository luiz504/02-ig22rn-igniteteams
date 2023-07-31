import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

export type ButtonTypeStyleProps = 'primary' | 'secondary'

type ContainerProps = {
  type: ButtonTypeStyleProps
}

const variants: Record<ButtonTypeStyleProps, ReturnType<typeof css>> = {
  primary: css`
    background-color: ${({ theme }) => theme.colors['green-700']};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors['red-700']};
  `,
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  padding: 16px;
  border-radius: 6px;

  align-items: center;

  ${({ type }) => variants[type]}
`
export const Label = styled.Text`
  line-height: 24px;

  display: flex;
  flex-shrink: 0;

  ${({ theme }) => css`
    font-family: ${theme.fontFamily.bold};
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.white};
  `}
`
