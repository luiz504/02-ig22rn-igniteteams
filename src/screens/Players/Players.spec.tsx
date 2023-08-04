import { Players } from '.'
import { useRoute } from '@react-navigation/native'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
  }
})

describe('Players Screen', () => {
  it('should render correctly ', () => {
    const team = {
      id: '12312',
      name: 'Hello Moto',
    }
    jest.mocked(useRoute).mockReturnValue({ params: { team } } as any)
    renderWithThemeAndNavigation(<Players />)
  })
})
