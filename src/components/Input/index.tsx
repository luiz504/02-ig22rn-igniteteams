import { FC, useState } from 'react'
import { TextInputProps } from 'react-native'

import { Container } from './styles'
import { useTheme } from 'styled-components/native'

interface InputProps extends TextInputProps {
  hasError?: boolean
}

export const Input: FC<InputProps> = ({
  hasError = false,
  onFocus,
  onBlur,
  ...rest
}) => {
  const theme = useTheme()

  const [isFocused, setIsFocused] = useState(false)

  const variant = (isFocused && 'active') || (hasError && 'error') || undefined

  return (
    <Container
      placeholderTextColor={theme.colors['gray-300']}
      onFocus={(event) => {
        setIsFocused(true)
        onFocus?.(event)
      }}
      onBlur={(event) => {
        setIsFocused(false)
        onBlur?.(event)
      }}
      {...rest}
      variant={variant}
    />
  )
}
