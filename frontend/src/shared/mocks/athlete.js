import { mockUsers } from "./user";

export const mockAthletes = [
  {
    userId: "u1",
    name: mockUsers[0].firstName + " " + mockUsers[0].lastName,
    photoUrl: mockUsers[0].photoUrl,
    dateOfBirth: "2000-05-12",
    isMinor: false,
    gender: "Female",
    bio:
      "En atlet med stora mål och en stabil disciplin. Jag kämpar alltid för att förbättras, " +
      "oavsett om det är på planen eller på sidan.",
    dreamGoal: "Att bli proffsspelare och representera Sverige internationellt.",
    sports: ["Tennis", "Fotboll", "Volleyboll"],
    followers: 20,
    following: 12,
    createdAt: "2024-01-01",
  },
];