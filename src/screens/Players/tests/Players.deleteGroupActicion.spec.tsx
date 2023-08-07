import { useNavigation, useRoute } from '@react-navigation/native'
import { fireEvent, screen } from '@testing-library/react-native'

import * as DeleteGroupModule from '@/storage/groups/deleteGroupByName'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

import { localStorage } from '@/libs/mmkv'

import { PLayersScreenCommons } from './common'

import { Players } from '..'
import { Alert } from 'react-native'
import { setGroupsStored } from '@/storage/utils/groupsHelpers'

const { groupData, btnDeleteGroupID } = PLayersScreenCommons

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }
})

describe('Players Screen => Delete Group Action integration', () => {
  const useMockedUseRoute = () =>
    jest
      .mocked(useRoute)
      .mockReturnValue({ params: { group: groupData } } as any)

  const useAlertSpy = () => jest.spyOn(Alert, 'alert')

  beforeEach(() => {
    jest.clearAllMocks()

    useMockedUseRoute()
    localStorage.clearAll()
  })

  it('should delete the Group correctly', async () => {
    setGroupsStored([groupData.name])

    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })

    const deleteGroupByNameSpy = jest.spyOn(
      DeleteGroupModule,
      'deleteGroupByName',
    )
    const alertSpy = useAlertSpy()

    renderWithThemeAndNavigation(<Players />)

    const deleteGroupBtn = screen.getByTestId(btnDeleteGroupID)

    // Act
    fireEvent.press(deleteGroupBtn)

    // Assert
    const buttonConfirmText = 'Yes, Delete it'
    expect(alertSpy).toHaveBeenCalledTimes(1)
    expect(alertSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.arrayContaining([
        expect.objectContaining({ text: buttonConfirmText }),
        expect.objectContaining({ text: 'Cancel' }),
      ]),
    )
    expect(alertSpy.mock.calls?.[0]?.[2]?.[0].onPress).toEqual(
      expect.any(Function),
    )

    // Act
    // Click the Alert Confirm button
    alertSpy.mock.calls?.[0]?.[2]?.[0].onPress?.()

    // Assert
    expect(deleteGroupByNameSpy).toHaveBeenCalledTimes(1)
    expect(deleteGroupByNameSpy).toHaveBeenCalledWith(groupData.name)

    expect(navigateMock).toBeCalledTimes(1)
    expect(navigateMock).toBeCalledWith('groups')
  })

  it('should trigger an Alert when the group delete action fails', () => {
    const navigateMock = jest.fn()
    jest.mocked(useNavigation).mockReturnValue({ navigate: navigateMock })

    const alertSpy = useAlertSpy()

    renderWithThemeAndNavigation(<Players />)

    const deleteGroupBtn = screen.getByTestId(btnDeleteGroupID)

    // Act
    fireEvent.press(deleteGroupBtn)

    // Open Dialog
    expect(alertSpy).toHaveBeenCalledTimes(1)

    // Act
    // Click the Alert Confirm button
    alertSpy.mock.calls?.[0]?.[2]?.[0].onPress?.()

    // Assert
    expect(alertSpy).toHaveBeenCalledTimes(2)

    expect(alertSpy.mock.calls[1]).toEqual(
      expect.arrayContaining([expect.any(String), expect.any(String)]),
    )
  })
})
