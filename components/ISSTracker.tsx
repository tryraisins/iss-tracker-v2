'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ISSLocation, ISSCrew } from '@/types/iss';
import LoadingSpinner from './LoadingSpinner';

// Dynamically import Globe3D to avoid SSR issues with Three.js
const Globe3D = dynamic(() => import('./Globe3D'), {
  ssr: false,
  loading: () => (
    <div className="globe-container flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
});

interface ISSData {
  location: ISSLocation;
  crew: ISSCrew[];
  lastUpdated: string;
  isFallback?: boolean;
}

export default function ISSTracker() {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchISSData = async () => {
    try {
      const response = await fetch('/api/iss', {
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Fetch failed');

      const data = await response.json();
      setIssData(data);
    } catch {
      if (!issData) {
        setIssData({
          location: {
            name: "ISS", id: 25544, latitude: 28.5, longitude: -80.6,
            altitude: 420, velocity: 27600, visibility: 'daylight',
            footprint: 4500, timestamp: Math.floor(Date.now() / 1000),
            daynum: 0, solar_lat: 0, solar_lon: 0, units: 'kilometers'
          },
          crew: [
            { name: "Sergey Prokopyev", craft: "ISS" },
            { name: "Dmitry Petelin", craft: "ISS" },
            { name: "Frank Rubio", craft: "ISS" },
            { name: "Jasmin Moghbeli", craft: "ISS" },
            { name: "Andreas Mogensen", craft: "ISS" },
            { name: "Satoshi Furukawa", craft: "ISS" }
          ],
          lastUpdated: new Date().toISOString(),
          isFallback: true
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchISSData();
    const interval = setInterval(fetchISSData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!issData) return (
    <div className="obs-card text-center py-16">
      <p style={{ color: 'var(--accent-aurora)' }}>No telemetry data available</p>
    </div>
  );

  const { location, crew, isFallback } = issData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Status Alert */}
      {isFallback && (
        <div className="lg:col-span-2 obs-card"
          style={{
            background: 'rgba(255, 107, 53, 0.08)',
            borderColor: 'rgba(255, 107, 53, 0.25)'
          }}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">🛰️</span>
            <div>
              <p className="font-display font-semibold" style={{ color: 'var(--accent-aurora)' }}>
                Simulation Mode
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Live API temporarily unavailable. Displaying estimated trajectory.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Globe + Position Data */}
      <div className="obs-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Orbital Position
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: isFallback ? 'rgba(255, 107, 53, 0.15)' : 'rgba(0, 180, 160, 0.15)',
              color: isFallback ? 'var(--accent-aurora)' : 'var(--accent-cosmic)',
              border: `1px solid ${isFallback ? 'rgba(255, 107, 53, 0.3)' : 'rgba(0, 180, 160, 0.3)'}`
            }}>
            {isFallback ? 'SIMULATED' : 'LIVE'}
          </span>
        </div>

        {/* 3D Globe */}
        <div className="mb-6">
          <Globe3D />
        </div>

        {/* Coordinate Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="data-metric">
            <div className="metric-value">{location.latitude.toFixed(4)}°</div>
            <div className="metric-label">Latitude</div>
          </div>
          <div className="data-metric">
            <div className="metric-value">{location.longitude.toFixed(4)}°</div>
            <div className="metric-label">Longitude</div>
          </div>
          <div className="data-metric">
            <div className="metric-value">{location.altitude.toFixed(1)}</div>
            <div className="metric-label">Altitude (km)</div>
          </div>
          <div className="data-metric">
            <div className="metric-value">{Math.round(location.velocity).toLocaleString()}</div>
            <div className="metric-label">Velocity (km/h)</div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
          Updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      {/* Crew Roster */}
      <div className="obs-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Crew Manifest
          </h3>
          <span className="px-3 py-1 rounded-full text-xs font-mono"
            style={{
              background: 'var(--bg-nebula)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)'
            }}>
            {crew.length} ONBOARD
          </span>
        </div>

        {crew.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {crew.map((person, index) => (
              <div
                key={`${person.name}-${index}`}
                className="crew-item anim-fade-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="crew-avatar">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="crew-name">{person.name}</div>
                  <div className="crew-status">
                    <span className="status-dot" />
                    <span>Onboard {person.craft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">👨‍🚀</span>
            <p style={{ color: 'var(--text-muted)' }}>Crew manifest unavailable</p>
          </div>
        )}

        {/* Orbital Parameters */}
        <div className="mt-6 p-5 rounded-2xl" style={{
          background: 'var(--bg-nebula)',
          border: '1px solid var(--border-subtle)'
        }}>
          <h4 className="font-display text-sm font-semibold mb-4"
            style={{ color: 'var(--accent-cosmic)' }}>
            ORBITAL PARAMETERS
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Period</span>
              <p className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>92.9 min</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Inclination</span>
              <p className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>51.64°</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Orbits/Day</span>
              <p className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>15.5</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Since Launch</span>
              <p className="font-mono font-semibold" style={{ color: 'var(--text-primary)' }}>25+ yrs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
