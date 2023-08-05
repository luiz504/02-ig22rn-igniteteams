import { GROUP_COLLECTION } from '../config'
import { z } from 'zod'
import { localStorage } from '@/libs/mmkv'

const groupSchema = z.array(z.string())
export function getAllGroups() {
  try {
    const storedGroups = localStorage.getString(GROUP_COLLECTION)

    if (!storedGroups) return []

    const storedGroupsParsed = JSON.parse(storedGroups)

    return groupSchema.parse(storedGroupsParsed)
  } catch (err) {
    return []
  }
}
