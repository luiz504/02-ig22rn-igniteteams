import { Team } from '.'

import { renderWithThemeAndNavigation } from '@/utils/test-utils'

describe('Team Screen', () => {
  it('should render correctly ', () => {
    renderWithThemeAndNavigation(<Team />)
  })
})
