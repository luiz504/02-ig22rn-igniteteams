import { TextInput } from 'react-native'
import styled, { css } from 'styled-components/native'

type TextInputVariant = 'active' | 'error'

const variants: Record<TextInputVariant, ReturnType<typeof css>> = {
  active: css`
    border-color: ${({ theme }) => theme.colors['green-700']};
  `,
  error: css`
    border-color: ${({ theme }) => theme.colors['red-700']};
  `,
}

type ContainerProps = {
  variant?: TextInputVariant
}

export const Container = styled(TextInput)<ContainerProps>`
  padding: 16px;
  border-radius: 6px;

  border-width: 1px;
  border-style: solid;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.md};
    font-family: ${theme.fontFamily.regular};
    color: ${theme.colors['gray-100']};

    background: ${theme.colors['gray-700']};

    border-color: ${theme.colors['gray-700']};
  `}

  ${({ variant }) => variant && variants[variant]}
`
