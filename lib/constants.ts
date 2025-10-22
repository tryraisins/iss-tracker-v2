export const ISS_INFO = {
  name: "International Space Station",
  mass: "419,725 kg",
  length: "73 m",
  width: "109 m",
  height: "20 m",
  volume: "915.6 m³",
  speed: "28,000 km/h",
  altitude: "408 km",
  orbitPeriod: "90 minutes",
  crewCapacity: "6",
  modules: "16",
  launchDate: "November 20, 1998",
  countries: ["United States", "Russia", "Japan", "Europe", "Canada"],
  orbitInclination: "51.6 degrees",
  powerOutput: "84-120 kilowatts",
  solarArrays: "8",
  cost: "$150 billion",
} as const;

export const TRIVIA_QUESTIONS = [
  {
    id: 1,
    question: "How fast does the ISS travel?",
    options: ["17,500 mph", "12,000 mph", "25,000 mph", "30,000 mph"],
    correctAnswer: "17,500 mph",
    explanation: "The ISS travels at approximately 17,500 mph (28,000 km/h), completing one orbit every 90 minutes."
  },
  {
    id: 2,
    question: "When was the first module of the ISS launched?",
    options: ["1995", "1998", "2000", "2001"],
    correctAnswer: "1998",
    explanation: "The first module, Zarya, was launched on November 20, 1998."
  },
  {
    id: 3,
    question: "How many solar arrays does the ISS have?",
    options: ["4", "8", "12", "16"],
    correctAnswer: "8",
    explanation: "The ISS has 8 solar arrays that generate 84-120 kilowatts of electricity."
  },
  {
    id: 4,
    question: "What is the typical altitude of the ISS?",
    options: ["200 km", "408 km", "600 km", "800 km"],
    correctAnswer: "408 km",
    explanation: "The ISS orbits at an average altitude of 408 km (253 miles) above Earth."
  },
  {
    id: 5,
    question: "How many countries participate in the ISS program?",
    options: ["5", "15", "25", "35"],
    correctAnswer: "15",
    explanation: "15 countries participate in the ISS program through international partnerships."
  }
];