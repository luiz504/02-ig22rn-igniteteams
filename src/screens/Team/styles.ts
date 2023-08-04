import styled, { css } from 'styled-components/native'

export const Form = styled.View`
  background-color: ${({ theme }) => theme.colors['gray-700']};

  flex-direction: row;
  align-items: center;

  border-radius: 6px;
`

export const RowFilters = styled.View`
  margin: 32px 0px;
  width: 100%;

  flex-direction: row;
  align-items: center;
`

export const Counter = styled.Text`
  margin-left: 18px;
  line-height: 22.4px;

  ${({ theme }) => css`
    color: ${theme.colors['gray-200']};
    font-size: ${theme.fontSize.sm};
    font-family: ${theme.fontFamily.bold};
  `}
`
