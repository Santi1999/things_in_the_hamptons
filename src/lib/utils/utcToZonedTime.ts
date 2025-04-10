export function utcToZonedTime(date: Date | string, timeZone: string): Date {
  const d = typeof date === "string" ? new Date(date) : date

  const localDate = new Date(d.toLocaleString("en-US", { timeZone }))

  const diff = d.getTime() - localDate.getTime()

  return new Date(d.getTime() - diff)
}
