import { PlayerStorageDTO } from '../models/PlayerStorageDTO'
import { getPlayersStored } from '../utils/playersHelpers'

export function getPlayersByGroup(groupName: string) {
  const storedTeam = getPlayersStored(groupName)

  const players: PlayerStorageDTO[] = storedTeam ? JSON.parse(storedTeam) : []

  return players
}
