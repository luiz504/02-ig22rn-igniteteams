import { forwardRef, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

interface InputProps extends TextInputProps {
  hasError?: boolean
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ hasError = false, onFocus, onBlur, ...rest }, ref) => {
    const theme = useTheme()

    const [isFocused, setIsFocused] = useState(false)

    const variant =
      (isFocused && 'active') || (hasError && 'error') || undefined

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
        ref={ref}
      />
    )
  },
)

Input.displayName = 'Input'
