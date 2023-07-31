import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import UserThree from '@assets/icons/user-three.svg'

export const Container = styled(TouchableOpacity)`
  width: 100%;

  padding: 32px 24px;
  gap: 20px;

  background-color: ${({ theme }) => theme.colors['gray-500']};
  flex-direction: row;
  align-items: center;
  border-radius: 6px;
`
export const Text = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg};
  line-height: 28.8px;
  color: ${({ theme }) => theme.colors['gray-100']};
  font-family: ${({ theme }) => theme.fontFamily.bold};
`

export const Icon = styled(UserThree).attrs({ width: 32, height: 32 })``
