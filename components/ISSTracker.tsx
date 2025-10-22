'use client';

import { useState, useEffect } from 'react';
import { ISSLocation, ISSCrew } from '@/types/iss';
import LoadingSpinner from './LoadingSpinner';

interface ISSData {
  location: ISSLocation;
  crew: ISSCrew[];
  lastUpdated: string;
  isFallback?: boolean;
}

export default function ISSTracker() {
  const [issData, setIssData] = useState<ISSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchISSData = async () => {
    try {
      const response = await fetch('/api/iss', {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setIssData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching ISS data:', err);
      setError('Unable to fetch live data. Showing simulated position.');
      
      // Set fallback data if fetch fails completely
      if (!issData) {
        setIssData({
          location: {
            name: "ISS",
            id: 25544,
            latitude: 28.5,
            longitude: -80.6,
            altitude: 420,
            velocity: 27600,
            visibility: 'daylight',
            footprint: 4500,
            timestamp: Math.floor(Date.now() / 1000),
            daynum: 0,
            solar_lat: 0,
            solar_lon: 0,
            units: 'kilometers'
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
    
    const interval = setInterval(fetchISSData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!issData) return <div className="text-center text-red-500">No data available</div>;

  const { location, crew, isFallback } = issData;

  // Calculate position for map visualization
  const mapX = ((location.longitude + 180) / 360) * 100;
  const mapY = ((90 - location.latitude) / 180) * 100;


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Status Alert */}
      {isFallback && (
        <div className="lg:col-span-2">
          <div className="space-card p-4 border border-yellow-500/30 bg-yellow-500/10">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛰️</span>
              <div>
                <strong className="text-yellow-300">Live Data Temporarily Unavailable</strong>
                <p className="text-yellow-200/80 text-sm">Showing simulated orbital data based on typical ISS trajectory</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map Section */}
      <div className="space-card p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-cyan-300">Orbital Position</h2>
          {isFallback ? (
            <span className="bg-yellow-500/20 text-yellow-300 text-sm px-3 py-1 rounded-full border border-yellow-500/30">
              Simulation Mode
            </span>
          ) : (
            <span className="bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full border border-green-500/30 flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Tracking</span>
            </span>
          )}
        </div>
        
        {/* Enhanced Data Display */}
        <div className="space-card p-4 mb-6 border border-white/10 bg-white/5">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-blue-300 text-sm font-semibold mb-1">LATITUDE</div>
              <div className="text-cyan-400 font-mono text-xl font-bold">{location.latitude.toFixed(4)}°</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <div className="text-purple-300 text-sm font-semibold mb-1">LONGITUDE</div>
              <div className="text-purple-400 font-mono text-xl font-bold">{location.longitude.toFixed(4)}°</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-green-300 text-sm font-semibold mb-1">ALTITUDE</div>
              <div className="text-green-400 font-mono text-xl font-bold">{location.altitude.toFixed(2)} km</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="text-orange-300 text-sm font-semibold mb-1">VELOCITY</div>
              <div className="text-orange-400 font-mono text-xl font-bold">{Math.round(location.velocity).toLocaleString()} km/h</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Map Visualization */}
        <div className="relative bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl h-80 border-2 border-blue-500/20 overflow-hidden mb-6">
          {/* Earth visualization with world map */}
          <div className="absolute inset-4 bg-blue-900/40 rounded-full border-2 border-blue-400/30 overflow-hidden">
            {/* This is where your world map image will be used as background */}
            <div className="absolute inset-0 opacity-40 bg-[url('/assets/world-map.png')] bg-cover bg-center"></div>
          </div>
          
          {/* ISS Marker */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-2000 ease-out z-20"
            style={{
              left: `${mapX}%`,
              top: `${mapY}%`
            }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full pulse-glow flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap border border-cyan-400/30">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>ISS</span>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-cyan-400 rotate-45"></div>
              </div>
              
              {/* Orbit trail */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="orbit-path w-96 h-96 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center space-y-2">
          <div className="text-blue-300 text-sm">Last orbital update: {new Date().toLocaleTimeString()}</div>
          {!isFallback && (
            <div className="text-green-400 text-sm font-semibold flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time data from WhereTheISS.at</span>
            </div>
          )}
        </div>
      </div>

      {/* Crew Information */}
      <div className="space-card p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-300">Orbital Crew</h2>
          <span className="bg-purple-500/20 text-purple-300 text-sm px-3 py-1 rounded-full border border-purple-500/30">
            {crew.length} Astronauts
          </span>
        </div>
        
        {crew.length > 0 ? (
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {crew.map((person, index) => (
              <div 
                key={`${person.name}-${index}`} 
                className="space-card p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:transform hover:scale-[1.02] group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-grow">
                    <div className="font-semibold text-white text-lg group-hover:text-cyan-300 transition-colors">
                      {person.name}
                    </div>
                    <div className="text-sm text-gray-400 flex items-center space-x-2 mt-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span>Onboard {person.craft}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl">👨‍🚀</div>
            <div className="text-gray-400">Crew data currently unavailable</div>
          </div>
        )}
        
        {/* Orbit Information */}
        <div className="mt-6 space-card p-4 border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <h3 className="font-semibold text-cyan-300 mb-3 text-lg">Orbital Dynamics</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-center p-2 rounded bg-white/5">
              <div className="text-cyan-400 font-semibold">Period</div>
              <div className="text-white">92.9 min</div>
            </div>
            <div className="text-center p-2 rounded bg-white/5">
              <div className="text-cyan-400 font-semibold">Inclination</div>
              <div className="text-white">51.64°</div>
            </div>
            <div className="text-center p-2 rounded bg-white/5">
              <div className="text-cyan-400 font-semibold">Orbits/Day</div>
              <div className="text-white">15.5</div>
            </div>
            <div className="text-center p-2 rounded bg-white/5">
              <div className="text-cyan-400 font-semibold">Altitude</div>
              <div className="text-white">~420 km</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
