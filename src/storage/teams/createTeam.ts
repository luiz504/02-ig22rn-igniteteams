import * as Crypto from 'expo-crypto'

import { TEAM_COLLECTION } from '../config'
import { getAllTeams } from './getallTeams'

import { Team } from '@/models/Team'
import { z } from 'zod'
import { localStorage } from '@/libs/mmkv'
export function createTeam(teamName: string) {
  const nameSchema = z.string().min(3)

  nameSchema.parse(teamName)

  const storedGroups = getAllTeams()

  const newTeam: Team = {
    id: Crypto.randomUUID(),
    name: teamName,
    players: [],
  }
  const newTeams = [...storedGroups, newTeam]
  localStorage.set(TEAM_COLLECTION, JSON.stringify(newTeams))

  return newTeam
}
