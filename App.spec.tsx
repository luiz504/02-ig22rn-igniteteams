import { render, screen } from '@testing-library/react-native'
import App from './App'

import * as expoFonts from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { theme } from '@/styles'

jest.mock('expo-font')
describe('App Component', () => {
  const useFontSpy = () => jest.spyOn(expoFonts, 'useFonts')
  it('should render Loading Component during the resources loading process', async () => {
    useFontSpy().mockReturnValue([false, null])

    render(<App />)

    expect(screen.getByTestId('loading-indicator')).toBeVisible()
    expect(screen.queryByTestId('wrapper')).toBeNull()
    expect(screen.UNSAFE_queryByType(StatusBar)).toBeNull()
  })

  it('should render status bars and screens correctly', () => {
    useFontSpy().mockReturnValue([true, null])

    render(<App />)
    const appWrapperElement = screen.getByTestId('app-wrapper')
    const statusBarElement = screen.UNSAFE_getByType(StatusBar)

    expect(screen.queryByTestId('loading-indicator')).toBeNull()
    expect(appWrapperElement).toBeTruthy()
    expect(appWrapperElement).toHaveStyle({
      backgroundColor: theme.colors['gray-600'],
      flex: 1,
    })
    expect(statusBarElement).toBeTruthy()
    expect(statusBarElement).toHaveProp(
      'backgroundColor',
      theme.colors['gray-600'],
    )
    expect(statusBarElement).toHaveProp('translucent', false)
    expect(statusBarElement).toHaveProp('style', 'inverted')
  })
})
