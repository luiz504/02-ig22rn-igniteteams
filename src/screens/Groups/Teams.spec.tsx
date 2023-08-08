import { fireEvent, screen } from '@testing-library/react-native'
import { useNavigation } from '@react-navigation/native'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'
import { localStorage } from '@/libs/mmkv'

import { Groups } from '.'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  }
})
describe('Should render Groups Screen', () => {
  const btnCreateGroupID = 'btn-create-group'
  const savedGroupsMock = ['t13', 't23']
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const useMockNavigate = () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })
    return navigateMock
  }

  it('should render correctly', () => {
    renderWithThemeAndNavigation(<Groups />)

    expect(screen.getByTestId('wrapper-groups')).toBeOnTheScreen()
    expect(screen.getByTestId(btnCreateGroupID)).toBeOnTheScreen()
  })
  it('should navigate to new-group Route when press the New Group button', () => {
    const navigateMock = useMockNavigate()
    renderWithThemeAndNavigation(<Groups />)

    const btnCreateGroupElement = screen.getByTestId(btnCreateGroupID)

    // Act
    fireEvent.press(btnCreateGroupElement)

    // Results
    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('new-group')
  })

  it('should not navigate if the group name does exists', () => {
    const navigateMock = useMockNavigate()
    renderWithThemeAndNavigation(<Groups />)

    const btnCreateGroupElement = screen.getByTestId(btnCreateGroupID)

    // Act
    fireEvent.press(btnCreateGroupElement)

    // Results
    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('new-group')
  })

  it('should navigate to the correct Players screen page', () => {
    jest
      .spyOn(localStorage, 'getString')
      .mockReturnValue(JSON.stringify(savedGroupsMock))

    const navigateMock = useMockNavigate()
    renderWithThemeAndNavigation(<Groups />)

    const groupCardElement = screen.getByTestId(
      `group-card-${savedGroupsMock[1]}`,
    )

    expect(groupCardElement).toBeOnTheScreen()

    // Acts
    fireEvent.press(groupCardElement)

    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith('players', {
      group: { name: savedGroupsMock[1] },
    })
  })
})
