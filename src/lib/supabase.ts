import { createClient } from "@supabase/supabase-js"

// Use environment variables for your Supabase URL and anon key
// Add these to your .env file
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Helper function to convert PostgreSQL dates to ISO format
function formatEventDates<
  T extends { start_time: string; end_date: string | null; created_at: string },
>(event: T): T {
  return {
    ...event,
    start_time: new Date(event.start_time).toISOString(),
    end_date: event.end_date ? new Date(event.end_date).toISOString() : null,
    created_at: new Date(event.created_at).toISOString(),
  } as T
}

// const toEST = (date: string) => {
//     return new Date(date).toLocaleString("en-US", {
//       timeZone: "America/New_York",
//       dateStyle: "full",
//       timeStyle: "long",
//     })
//   }

//   return {
//     ...event,
//     start_time: toEST(event.start_time),
//     end_date: event.end_date ? toEST(event.end_date) : null,
//     created_at: toEST(event.created_at),
//   } as T
// }
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

// Function to fetch events sorted by start_time
export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("start_time", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    return []
  }

  // Use helper function to format dates
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
    // Use helper function to format dates
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

  // Use helper function to format dates
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

  // Use helper function to format dates
  return (data || []).map(formatEventDates) as Event[]
}
