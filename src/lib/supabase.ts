import { createClient } from "@supabase/supabase-js"
import { decode } from "html-entities"

// Use environment variables for your Supabase URL and anon key
// Add these to your .env file
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definition for events table
export type Event = {
  id: number
  title: string
  description: string
  start_time: string
  end_date: string | null
  location: string
  image_url: string | null
  event_url: string | null
  slug: string
  created_at: string
}

// Define a generic type for your data
export type PaginatedResponse<T> = {
  data: T[]
  count: number
  error: Error | null
}

// Define pagination parameters
export type PaginationParams = {
  page: number
  pageSize: number
}

// Helper function to format event dates and decode HTML entities
function formatEventDates<
  T extends {
    start_time: string
    end_date: string | null
    created_at: string
    title: string
    description: string
  },
>(event: T): T {
  return {
    ...event,
    start_time: new Date(event.start_time).toISOString(),
    end_date: event.end_date ? new Date(event.end_date).toISOString() : null,
    created_at: new Date(event.created_at).toISOString(),
    title: decode(event.title),
    description: decode(event.description),
  } as T
}

/**
 * Function to fetch paginated data from any Supabase table
 *
 * @param tableName - Name of the table to query
 * @param paginationParams - Page number and size
 * @param queryModifier - Optional function to modify the query (add filters, etc.)
 * @returns Promise with paginated data and total count
 */
export async function getPaginatedData<T>(
  tableName: string,
  { page, pageSize }: PaginationParams,
  queryModifier?: (query: any) => any
): Promise<PaginatedResponse<T>> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    let query = supabase.from(tableName).select("*", { count: "exact" })

    if (queryModifier) {
      query = queryModifier(query)
    }

    query = query.range(from, to)

    const { data, error, count } = await query

    return {
      data: data as T[],
      count: count || 0,
      error,
    }
  } catch (error) {
    console.error("Error fetching paginated data:", error)
    return {
      data: [],
      count: 0,
      error: error as Error,
    }
  }
}

// Function to fetch events sorted by start_time
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true })
    .limit(50)

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  return (data || []).map(formatEventDates) as Event[]
}

// Function to fetch a specific event by slug
export async function getEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) {
    console.error(`Error fetching event with slug ${slug}:`, error)
    return null
  }

  if (data) {
    return formatEventDates(data) as Event
  }

  return null
}

// Function to get upcoming events (events with start_time >= today)
export async function getUpcomingEvents(limit = 6) {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("start_time", today)
    .order("start_time", { ascending: true })
    .limit(limit)

  if (error) {
    console.error("Error fetching upcoming events:", error)
    return []
  }

  return (data || []).map(formatEventDates) as Event[]
}

// Function to get past events (events with start_time < today)
export async function getPastEvents(limit = 6) {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .lt("start_time", today)
    .order("start_time", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching past events:", error)
    return []
  }

  return (data || []).map(formatEventDates) as Event[]
}
