import { Team } from '.'

import { renderWithTheme } from '@/utils/test-utils'

describe('Team Screen', () => {
  it('should render correctly ', () => {
    renderWithTheme(<Team />)
  })
})
