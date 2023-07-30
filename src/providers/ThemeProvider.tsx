import { theme } from '@/styles'
import { FC, ReactNode } from 'react'
import { ThemeProvider as TP } from 'styled-components/native'

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <TP theme={theme}>{children}</TP>
)
