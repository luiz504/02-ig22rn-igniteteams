import styled, { css } from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
  padding: 16px 13px;
  gap: 8px;

  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors['gray-500']};
  flex-direction: row;
  align-items: center;
`

export const Label = styled.Text`
  flex: 1;
  ${({ theme }) => css`
    color: ${theme.colors['gray-100']};
    font-size: ${theme.fontSize.md};
    line-height: 25.6px;
    font-family: ${({ theme }) => theme.fontFamily.regular};
  `};
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors['gray-200'],
}))``
