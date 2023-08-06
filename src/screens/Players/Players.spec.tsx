import { Players } from '.'
import { useRoute } from '@react-navigation/native'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { fireEvent, screen } from '@testing-library/react-native'
import { Alert } from 'react-native'
import { localStorage } from '@/libs/mmkv'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})

describe('Players Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const initialTeam = {
    name: 'Fake Initial Team',
  }
  const inputID = 'player-name-input'
  const submitBtnID = 'submit-btn'
  const btnDeleteTeam = 'remove-team-btn'

  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: initialTeam } } as any)

  const useAlertSpy = () => jest.spyOn(Alert, 'alert')

  it('should render correctly ', () => {
    useMockedUseRoute()
    renderWithThemeAndNavigation(<Players />)

    expect(screen.getByTestId(inputID)).toBeOnTheScreen()
    expect(screen.getByTestId(submitBtnID)).toBeOnTheScreen()
    expect(screen.getByTestId(btnDeleteTeam)).toBeOnTheScreen()
  })

  it('should throw an Alert when the player name is not valid', () => {
    useMockedUseRoute()
    renderWithThemeAndNavigation(<Players />)

    const alertSpy = useAlertSpy()

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)

    fireEvent.changeText(inputElement, 'KO')
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })

  it('should throw an Alert when the player name is already in a team', () => {
    useMockedUseRoute()
    renderWithThemeAndNavigation(<Players />)

    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify([{ name: 'KO', team: initialTeam.name }]))

    const alertSpy = useAlertSpy()

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)

    fireEvent.changeText(inputElement, 'KO')
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toBeCalledTimes(1)
    expect(alertSpy).toBeCalledWith(expect.any(String), expect.any(String))
  })

  it('Should add a player to a team correctly', () => {
    useMockedUseRoute()
    renderWithThemeAndNavigation(<Players />)

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitBtnID)

    fireEvent.changeText(inputElement, 'KO')
    fireEvent.press(submitBtnElement)
    // Continue
  })
})
