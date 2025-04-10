import {
  parseISO,
  format,
  formatDistanceToNowStrict,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns"

import { utcToZonedTime } from "./utcToZonedTime" // our own function

const timeZone = "America/New_York"

export const formatDate = (
  dateString: string,
  formatStyle = "long"
): string => {
  const date = parseISO(dateString)
  const estDate = utcToZonedTime(date, timeZone)

  if (formatStyle === "short") {
    // Example: "Apr 10, 2025 8:00 PM EDT" just like txr we can switch it est during january or something
    return `${format(estDate, "MMM dd, yyyy h:mm a")} EST`
  }

  return `${format(estDate, "EEEE, MMMM d, yyyy 'at' h:mm a")} EST`
}

export const formatTimeDifference = (dateString: string): string => {
  const date = parseISO(dateString)
  const estDate = utcToZonedTime(date, timeZone)
  return formatDistanceToNowStrict(estDate, { addSuffix: true })
}

export const getEventDistance = (
  date: string,
  options?: { style?: "strict" | "friendly"; addSuffix?: boolean }
): string => {
  const parsedDate = parseISO(date)
  const style = options?.style || "friendly"
  const addSuffix = options?.addSuffix !== undefined ? options.addSuffix : true

  if (style === "friendly") {
    if (isToday(parsedDate)) return "today"
    if (isTomorrow(parsedDate)) return "tomorrow"
    if (isYesterday(parsedDate)) return "yesterday"
  }
  return formatDistanceToNowStrict(parsedDate, { addSuffix })
}

export const getDateDistance = (date: string): string =>
  formatDistanceToNowStrict(parseISO(date), { addSuffix: true })
