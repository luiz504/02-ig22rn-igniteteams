import { fireEvent, screen } from '@testing-library/react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { renderWithTheme } from '@/utils/test-utils'

import { PlayerCard } from '.'

describe('PlayerCard Component', () => {
  const label = 'Label'
  const rootID = 'root-id'
  it('should render correctly', () => {
    renderWithTheme(
      <PlayerCard label={label} testID={rootID} onDeletePress={() => {}} />,
    )

    expect(screen.UNSAFE_getAllByType(MaterialIcons)).toHaveLength(2)
    expect(screen.getByTestId(rootID)).toBeOnTheScreen()
    expect(screen.getByText(label)).toBeOnTheScreen()
  })

  it('should call onDeletePress', () => {
    const onDeletePressMock = jest.fn()
    renderWithTheme(
      <PlayerCard
        label={label}
        testID={rootID}
        onDeletePress={onDeletePressMock}
      />,
    )
    const deleteButton = screen.getByTestId(`${rootID}-delete-btn`)

    fireEvent.press(deleteButton)

    expect(onDeletePressMock).toHaveBeenCalledTimes(1)
    expect(onDeletePressMock).toHaveBeenCalledWith()
  })
})
