import * as SplashScreen from 'expo-splash-screen'
import { render, screen } from '@testing-library/react-native'
import * as expoFonts from 'expo-font'
import { StatusBar } from 'expo-status-bar'

import App from './App'

jest.mock('expo-font')
jest.mock('expo-splash-screen')
describe('App Component', () => {
  const pageWrapperId = 'wrapper-groups'
  const useFontSpy = () => jest.spyOn(expoFonts, 'useFonts')
  const useHideAsyncSpy = () => jest.spyOn(SplashScreen, 'hideAsync')
  it('should render Loading Component during the resources loading process', async () => {
    useFontSpy().mockReturnValue([false, null])
    const hideSplashScreenSpy = useHideAsyncSpy()

    render(<App />)

    expect(screen.queryByTestId(pageWrapperId)).toBeNull()
    expect(screen.UNSAFE_queryByType(StatusBar)).toBeNull()
    expect(hideSplashScreenSpy).not.toHaveBeenCalled()
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render status bars and screens correctly', () => {
    useFontSpy().mockReturnValue([true, null])
    const hideSplashScreenSpy = useHideAsyncSpy()
    render(<App />)
    const appWrapperElement = screen.getByTestId(pageWrapperId)
    const statusBarElement = screen.UNSAFE_getByType(StatusBar)

    expect(screen.queryByTestId('loading-indicator')).toBeNull()
    expect(appWrapperElement).toBeOnTheScreen()

    expect(statusBarElement).toBeOnTheScreen()

    expect(statusBarElement).toHaveProp('style', 'light')
    expect(hideSplashScreenSpy).toBeCalledTimes(1)
  })
})
