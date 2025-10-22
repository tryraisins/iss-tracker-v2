import { ISS_INFO } from '@/lib/constants';

export default function ISSInfo() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        About the International Space Station
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(ISS_INFO).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="font-semibold text-gray-600 mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}:
            </div>
            <div className="text-lg font-bold text-blue-600">
              {Array.isArray(value) ? value.join(', ') : value}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">Fun Facts</h3>
        <ul className="list-disc list-inside space-y-2 text-blue-700">
          <li>Largest human-made object in space</li>
          <li>Visible from Earth with the naked eye</li>
          <li>Has been continuously occupied since November 2000</li>
          <li>Cost approximately $150 billion to build and maintain</li>
          <li>Has hosted astronauts from 19 countries</li>
        </ul>
      </div>
    </div>
  );
}