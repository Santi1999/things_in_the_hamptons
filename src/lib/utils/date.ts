import {
  formatDistanceToNowStrict,
  parseISO,
  format,
  isToday,
  isTomorrow,
  isYesterday,
} from "date-fns"

export const getEventDistance = (
  date: string,
  options?: {
    style?: "strict" | "friendly"
    addSuffix?: boolean
  }
) => {
  const parsedDate = parseISO(date)
  const style = options?.style || "friendly"
  const addSuffix = options?.addSuffix !== undefined ? options.addSuffix : true

  // For friendly style, check for special cases
  if (style === "friendly") {
    if (isToday(parsedDate)) return "today"
    if (isTomorrow(parsedDate)) return "tomorrow"
    if (isYesterday(parsedDate)) return "yesterday"
  }

  // Otherwise use the strict formatting
  return formatDistanceToNowStrict(parsedDate, { addSuffix })
}

export const getDateDistance = (date: string) =>
  formatDistanceToNowStrict(parseISO(date), {
    addSuffix: true,
  })

export const formatDate = (
  date: string,
  formatDate: "long" | "short" = "long"
) => {
  console.log(date)
  const parseDate = parseISO(date)
  if (formatDate === "short") {
    return format(parseDate, "MMMM dd, yyyy zz")
  }

  return format(parseDate, "EEEE, MMMM d, yyyy h:mm a zz")
}

// import { parseISO, format } from "date-fns"
// import { toZonedTime } from "date-fns-tz"

// // Convert date to EST time zone
// export const toESTTime = (date: string) => {
//   const parsedDate = parseISO(date)
//   return toZonedTime(parsedDate, "America/New_York")
// }

// // Format date in EST with different format options
// export const formatDate = (
//   date: string,
//   formatStyle: "long" | "short" = "long"
// ) => {
//   const estDate = toESTTime(date)

//   if (formatStyle === "short") {
//     return format(estDate, "MMMM dd, yyyy")
//   }

//   return format(estDate, "EEEE, MMMM d, yyyy h:mm a 'EST'")
// }
