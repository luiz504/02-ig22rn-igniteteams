/* eslint-disable @typescript-eslint/no-empty-interface */
import { theme } from '@/styles'
import 'styled-components/native'

type ThemeType = typeof theme
declare module 'styled-components/native' {
  export interface DefaultTheme extends ThemeType {}
}
