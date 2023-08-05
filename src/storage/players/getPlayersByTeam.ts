import { localStorage } from '@/libs/mmkv'
import { PLAYER_COLLECTION } from '../config'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export function getPlayersByTeam(team: string) {
  const storedTeam = localStorage.getString(`${PLAYER_COLLECTION}-${team}`)

  const players: PlayerStorageDTO[] = storedTeam ? JSON.parse(storedTeam) : []

  return players
}
