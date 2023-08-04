import { teamSchema } from '@/models/Team'
import { TEAM_COLLECTION } from '../config'
import { z } from 'zod'
import { localStorage } from '@/libs/mmkv'

const teamsSchema = z.array(teamSchema)
export function getAllTeams() {
  const storedTeams = localStorage.getString(TEAM_COLLECTION)

  if (!storedTeams) return []

  try {
    return teamsSchema.parse(JSON.parse(storedTeams))
  } catch (err) {
    throw new Error('Saved teams schema is Invalid')
  }
}
