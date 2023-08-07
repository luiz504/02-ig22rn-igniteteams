import { z } from 'zod'

import { getGroupsStored } from '../utils/groupsHelpers'

const groupSchema = z.array(z.string())
export function getAllGroups() {
  try {
    const storedGroups = getGroupsStored()

    if (!storedGroups) return []

    const storedGroupsParsed = JSON.parse(storedGroups)

    return groupSchema.parse(storedGroupsParsed)
  } catch (err) {
    return []
  }
}
