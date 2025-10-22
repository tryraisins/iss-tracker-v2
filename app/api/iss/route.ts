import { NextResponse } from 'next/server';
import { fetchISSLocation, fetchISSCrew } from '@/utils/iss';

type CrewMember = {
  name: string;
  craft: string;
};

export async function GET() {
  try {
    const [location, crewData] = await Promise.all([
      fetchISSLocation(),
      fetchISSCrew()
    ]);

    const issCrew = crewData.people.filter((person: CrewMember) => person.craft === 'ISS');

    return NextResponse.json({
      location,
      crew: issCrew,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('ISS API Error:', error);
    
    // Return comprehensive fallback data
    const fallbackData = {
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
        { name: "Satoshi Furukawa", craft: "ISS" },
        { name: "Konstantin Borisov", craft: "ISS" },
        { name: "Oleg Kononenko", craft: "ISS" },
        { name: "Nikolai Chub", craft: "ISS" },
        { name: "Loral O'Hara", craft: "ISS" }
      ],
      lastUpdated: new Date().toISOString(),
      isFallback: true
    };

    return NextResponse.json(fallbackData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache',
      }
    });
  }
}

export const dynamic = 'force-dynamic';