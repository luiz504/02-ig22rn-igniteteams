import { TEAM_COLLECTION } from '../config'
import { z } from 'zod'
import { localStorage } from '@/libs/mmkv'

const teamsSchema = z.array(z.string())
export function getAllTeams() {
  try {
    const storedTeams = localStorage.getString(TEAM_COLLECTION)

    if (!storedTeams) return []

    const storedTeamsParsed = JSON.parse(storedTeams)

    return teamsSchema.parse(storedTeamsParsed)
  } catch (err) {
    return []
  }
}
