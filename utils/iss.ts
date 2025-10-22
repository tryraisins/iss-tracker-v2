import { ISSLocation, WhereTheISSAtResponse } from '@/types/iss';

export async function fetchISSLocation(): Promise<ISSLocation> {
  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', {
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: WhereTheISSAtResponse = await response.json();
    
    return {
      name: data.name,
      id: data.id,
      latitude: data.latitude,
      longitude: data.longitude,
      altitude: data.altitude,
      velocity: data.velocity,
      visibility: data.visibility,
      footprint: data.footprint,
      timestamp: data.timestamp,
      daynum: data.daynum,
      solar_lat: data.solar_lat,
      solar_lon: data.solar_lon,
      units: data.units
    };
  } catch (error) {
    console.error('Error fetching ISS location from wheretheiss.at:', error);
    // Return fallback data
    return {
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
    };
  }
}

export async function fetchISSCrew() {
  try {
    const response = await fetch('http://api.open-notify.org/astros.json', {
      cache: 'no-cache',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ISS crew:', error);
    // Return fallback crew data
    return {
      people: [
        { name: "Sergey Prokopyev", craft: "ISS" },
        { name: "Dmitry Petelin", craft: "ISS" },
        { name: "Frank Rubio", craft: "ISS" },
        { name: "Jasmin Moghbeli", craft: "ISS" },
        { name: "Andreas Mogensen", craft: "ISS" },
        { name: "Satoshi Furukawa", craft: "ISS" },
        { name: "Konstantin Borisov", craft: "ISS" },
        { name: "Oleg Kononenko", craft: "ISS" },
        { name: "Nikolai Chub", craft: "ISS" },
        { name: "Loral O'Hara", craft: "ISS" }
      ]
    };
  }
}