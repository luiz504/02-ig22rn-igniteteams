import { Alert } from 'react-native'
import { fireEvent, screen } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { localStorage } from '@/libs/mmkv'
import { theme } from '@/styles'

import { NewGroup } from '.'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('NewGroup Component', () => {
  const inputID = 'input-new-group'
  const submitButtonID = 'submit-btn'

  const savedTeamsMock = ['t13', 't23']

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render correctly', () => {
    renderWithThemeAndNavigation(<NewGroup />)

    expect(screen.getByTestId(inputID)).toBeOnTheScreen()
    expect(screen.getByTestId(submitButtonID)).toBeOnTheScreen()
  })

  it('should trigger Alert if the name is already in use', () => {
    renderWithThemeAndNavigation(<NewGroup />)
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedTeamsMock))

    const alertSpy = jest.spyOn(Alert, 'alert')

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitButtonID)

    fireEvent.changeText(inputElement, savedTeamsMock[0])
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
    )
  })

  it('should trigger Alert if the name field does not respect the createGroup constrains', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedTeamsMock))
    const alertSpy = jest.spyOn(Alert, 'alert')

    renderWithThemeAndNavigation(<NewGroup />)

    const submitBtnElement = screen.getByTestId(submitButtonID)
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
    )

    const InputElement = screen.getByTestId(inputID)
    expect(InputElement).toHaveStyle({
      borderTopColor: theme.colors['red-700'],
    })

    // Act clean error when focus the input again
    fireEvent(InputElement, 'focus')
    fireEvent(InputElement, 'blur')

    expect(screen.getByTestId(inputID)).toHaveStyle({
      borderTopColor: theme.colors['gray-700'],
    })
  })

  it('should navigate to the Players screen passing the group created', () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })

    renderWithThemeAndNavigation(<NewGroup />)

    const newTeamName = 'New Fake Team'

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitButtonID)

    fireEvent.changeText(inputElement, newTeamName)
    fireEvent.press(submitBtnElement)

    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('players', {
      group: { name: newTeamName },
    })
  })
})
