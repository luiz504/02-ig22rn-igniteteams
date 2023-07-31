import styled, { css } from 'styled-components/native'

export const Container = styled.View`
  margin: 24px 0;
  gap: 4px;
`

export const Heading = styled.Text`
  text-align: center;
  line-height: 28px;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.lg};
    font-family: ${theme.fontFamily.bold};
    color: ${theme.colors.white};
  `}
`

export const SubHeading = styled.Text`
  text-align: center;
  line-height: 25.6px;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.md};
    font-family: ${theme.fontFamily.regular};
    color: ${theme.colors['gray-300']};
  `}
`
