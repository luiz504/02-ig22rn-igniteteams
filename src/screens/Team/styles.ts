import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
`

export const Form = styled.View`
  background-color: ${({ theme }) => theme.colors['gray-700']};

  flex-direction: row;
  align-items: center;

  border-radius: 6px;
`
