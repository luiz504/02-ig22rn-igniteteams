import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors['gray-700']};
  font-size: ${({ theme }) => theme.fontSize.lg};
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
`

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors['green-500']};
  font-family: ${({ theme }) => theme.fontFamily.bold};
`
