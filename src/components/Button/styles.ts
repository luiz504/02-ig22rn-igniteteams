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
  display: flex;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fontFamily.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.md};
  line-height: 24px;
`
