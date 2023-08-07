import { PlayerStorageDTO } from '@/storage/models/PlayerStorageDTO'
import { TEAMS } from '../constants'

const groupData = {
  name: 'Fake Initial Team',
}

const storedPlayers: PlayerStorageDTO[] = [
  { name: 'John Doe', team: TEAMS[0].name },
  { name: 'Mary Doe', team: TEAMS[0].name },
  { name: 'Marco Doe', team: TEAMS[1].name },
  { name: 'Michael Doe', team: TEAMS[1].name },
  { name: 'Tony Doe', team: TEAMS[1].name },
]
const team0PLayers = storedPlayers.filter((p) => p.team === TEAMS[0].name)
const team1PLayers = storedPlayers.filter((p) => p.team === TEAMS[1].name)

const inputID = 'player-name-input'
const submitBtnID = 'submit-btn'
const btnDeleteGroupID = 'delete-group-btn'
const playersCounterID = 'players-counter'
const emptyFeedbackID = 'empty-feedback'
const teamSelectorID = 'team-selector'
const playerCardID = 'player-card'

export const PLayersScreenCommons = {
  groupData,
  storedPlayers,
  inputID,
  submitBtnID,
  btnDeleteGroupID,
  playersCounterID,
  emptyFeedbackID,
  teamSelectorID,
  playerCardID,
  team0PLayers,
  team1PLayers,
}
