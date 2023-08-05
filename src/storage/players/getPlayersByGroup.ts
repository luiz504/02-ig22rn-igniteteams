import { localStorage } from '@/libs/mmkv'
import { PLAYER_COLLECTION } from '../config'
import { PlayerStorageDTO } from './PlayerStorageDTO'

export function getPlayersByGroup(group: string) {
  const storedTeam = localStorage.getString(`${PLAYER_COLLECTION}-${group}`)

  const players: PlayerStorageDTO[] = storedTeam ? JSON.parse(storedTeam) : []

  return players
}
