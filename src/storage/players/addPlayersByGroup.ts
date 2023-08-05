import { localStorage } from '@/libs/mmkv'
import { PlayerStorageDTO } from './PlayerStorageDTO'
import { PLAYER_COLLECTION } from '../config'

export function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  localStorage.set(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(newPlayer))
}
