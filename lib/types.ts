export interface Horse {
  id: string
  name: string
  slug: string
  image_url: string | null
  date_of_birth: string | null
  date_of_death: string | null
  cause_of_death: string | null
  story: string
  racetrack_id: string | null
  created_at: string
  updated_at: string
}

export interface Racetrack {
  id: string
  name: string
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  description: string | null
  total_deaths: number
  status: "active" | "closed"
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  image_url: string | null
  published: boolean
  published_at: string | null
  author: string
  created_at: string
  updated_at: string
}

export interface Pledge {
  id: string
  full_name: string
  email: string
  phone: string | null
  city: string | null
  message: string | null
  created_at: string
}

export interface Subscription {
  id: string
  email: string
  subscribed: boolean
  created_at: string
}

export interface Report {
  id: string
  reporter_name: string | null
  reporter_email: string
  incident_type: "injury" | "death" | "abuse" | "other"
  racetrack_name: string
  incident_date: string | null
  description: string
  evidence_urls: string[] | null
  status: "pending" | "reviewing" | "verified" | "dismissed"
  created_at: string
  updated_at: string
}
