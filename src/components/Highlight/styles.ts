import styled from 'styled-components/native'

export const Container = styled.View`
  margin: 24px 0;
  gap: 4px;
`

export const Heading = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-family: ${({ theme }) => theme.fontFamily.bold};
  color: ${({ theme }) => theme.colors.white};
  line-height: 28px;
`

export const Text = styled.Text`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fontFamily.regular};
  color: ${({ theme }) => theme.colors['gray-300']};
  line-height: 25.6px;
`
