"use client"

import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import L from "leaflet"
import type { Racetrack } from "@/lib/types"
import { useMemo } from "react"
import "leaflet/dist/leaflet.css"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"

interface InteractiveIndiaMapProps {
  racetracks: Racetrack[]
}

const INDIA_CENTER: [number, number] = [22.0, 80.0]

function createDivIcon(deaths: number, size = 24) {
  const html = `<div style="width:${size}px;height:${size}px;background:rgba(220,38,38,0.95);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:600;font-size:${Math.max(10, Math.round(size / 3))}px;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3)">${deaths}</div>`
  return L.divIcon({ html, className: "" })
}

export function InteractiveIndiaMap({ racetracks }: InteractiveIndiaMapProps) {
  const maxDeaths = useMemo(() => Math.max(1, ...racetracks.map((r) => Number(r.total_deaths) || 0)), [racetracks])

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
  const tileUrl = mapboxToken
    ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  const attribution = mapboxToken
    ? '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> | © OpenStreetMap contributors'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <MapContainer center={INDIA_CENTER} zoom={5} scrollWheelZoom style={{ height: 520, width: "100%" }} zoomControl={false}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <ZoomControl position="topright" />

        <MarkerClusterGroup chunkedLoading>
          {racetracks.map((t) => {
            const lat = Number((t as any).latitude)
            const lng = Number((t as any).longitude)
            if (!isFinite(lat) || !isFinite(lng)) return null

            const deaths = Number(t.total_deaths) || 0
            const scaled = Math.sqrt(deaths / maxDeaths)
            const size = 18 + Math.round(scaled * 28)

            return (
              <Marker key={t.id} position={[lat, lng]} icon={createDivIcon(deaths, size)}>
                <Popup>
                  <div className="max-w-xs">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {t.city}{t.state ? `, ${t.state}` : ""}
                    </div>
                    <div className="mt-2 font-bold text-destructive">{t.total_deaths} deaths</div>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  )
}

export default InteractiveIndiaMap
