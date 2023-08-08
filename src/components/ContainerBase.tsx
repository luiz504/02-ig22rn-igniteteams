import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'styled-components/native'

export const ContainerBase = styled(SafeAreaView)`
  background-color: ${({ theme }) => theme.colors['gray-600']};
  padding: 12px 24px;
  flex: 1;
`
