import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'

import CaretLeft from '@assets/icons/caret-left.svg'

export const Container = styled.View`
  width: 100%;
  flex-direction: row;

  justify-content: center;
`

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

export const BackButton = styled(TouchableOpacity)`
  margin-right: auto;

  justify-content: center;
  align-items: center;
`

export const BackIcon = styled(CaretLeft)`
  height: 90px;
`
