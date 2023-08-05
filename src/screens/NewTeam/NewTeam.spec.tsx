import { fireEvent, screen } from '@testing-library/react-native'
import { NewTeam } from '.'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { Team } from '@/models/Team'
import { Alert } from 'react-native'
import { localStorage } from '@/libs/mmkv'
import { useNavigation } from '@react-navigation/native'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('NewTeam Component', () => {
  const inputID = 'input-new-team'
  const submitButtonID = 'submit-btn'

  const savedTeamsMock: Team[] = [
    { id: 't1', name: 't13', players: [] },
    { id: 't2', name: 't23', players: [] },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render correctly', () => {
    renderWithThemeAndNavigation(<NewTeam />)

    expect(screen.getByTestId(inputID)).toBeOnTheScreen()
    expect(screen.getByTestId(submitButtonID)).toBeOnTheScreen()
  })

  it('should trigger Alert if the name is already in use', () => {
    renderWithThemeAndNavigation(<NewTeam />)
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedTeamsMock))

    const alertSpy = jest.spyOn(Alert, 'alert')

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitButtonID)

    fireEvent.changeText(inputElement, savedTeamsMock[0].name)
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
    )
  })

  it('should trigger Alert if the name field does not respect the createTeam constrains', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedTeamsMock))
    const alertSpy = jest.spyOn(Alert, 'alert')

    renderWithThemeAndNavigation(<NewTeam />)

    const submitBtnElement = screen.getByTestId(submitButtonID)
    fireEvent.press(submitBtnElement)

    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
    )
  })

  it('should navigate to the Players screen passing the team created', () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })

    renderWithThemeAndNavigation(<NewTeam />)

    const newTeamName = 'New Fake Team'

    const inputElement = screen.getByTestId(inputID)
    const submitBtnElement = screen.getByTestId(submitButtonID)

    fireEvent.changeText(inputElement, newTeamName)
    fireEvent.press(submitBtnElement)

    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('players', {
      team: expect.objectContaining({ name: newTeamName, players: [] }),
    })
  })
})
