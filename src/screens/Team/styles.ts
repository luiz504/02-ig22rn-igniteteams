import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Form = styled.View`
  background-color: ${({ theme }) => theme.colors['gray-700']};

  flex-direction: row;
  align-items: center;

  border-radius: 6px;
`

export const RowFilters = styled.View`
  margin-top: 32px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

export const Counter = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors['gray-200']};
    font-size: ${theme.fontSize.sm};
    font-family: ${theme.fontFamily.bold};
    line-height: 22.4px;
  `}
`
