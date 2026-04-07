import MapEntryForm from "@/components/map-entry-form"

export const metadata = {
  title: "Map Admin",
}

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Map admin</h1>
      <p className="mb-4 text-sm text-muted-foreground">Add racetrack entries (local/dev only).</p>
      <MapEntryForm />
    </div>
  )
}
