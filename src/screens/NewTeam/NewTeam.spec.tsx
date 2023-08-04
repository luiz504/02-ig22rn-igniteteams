import { NewTeam } from '.'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

describe('NewTeam Component', () => {
  it('should render correctly', () => {
    renderWithThemeAndNavigation(<NewTeam />)
  })
})
