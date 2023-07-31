import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

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
  line-height: 28.8px;

  ${({ theme }) => css`
    font-size: ${theme.fontSize.lg};
    color: ${theme.colors['gray-100']};
    font-family: ${theme.fontFamily.bold};
  `}
`

export const Icon = styled(UserThree).attrs({ width: 32, height: 32 })``
