import * as Crypto from 'expo-crypto'
import { z } from 'zod'

import { TEAM_COLLECTION } from '../config'
import { getAllTeams } from './getallTeams'

import { Team } from '@/models/Team'
import { localStorage } from '@/libs/mmkv'
import { AppError } from '@/utils/AppError'
export function createTeam(teamName: string) {
  const nameSchema = z
    .string()
    .min(3, { message: 'The Team name Must have at least 3 characters' })
  const trimmedValue = teamName.trim()
  nameSchema.parse(trimmedValue)

  const storedGroups = getAllTeams()

  const teamAlreadyExists = storedGroups.find(
    (t) => t.name.toLowerCase() === trimmedValue.toLowerCase(),
  )

  if (teamAlreadyExists) throw new AppError('Team  name already in use.')

  const newTeam: Team = {
    id: Crypto.randomUUID(),
    name: trimmedValue,
    players: [],
  }
  const newTeams = [...storedGroups, newTeam]
  localStorage.set(TEAM_COLLECTION, JSON.stringify(newTeams))

  return newTeam
}
