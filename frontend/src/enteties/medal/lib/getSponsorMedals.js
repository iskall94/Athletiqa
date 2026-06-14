import { MedalsSteps } from "../config/medalsSteps";

export function getSponsorMedals(donationCount) {
  return MedalsSteps.map((medal, index) => ({
    medalId: index + 1,
    name: medal.label,
    description: medal.description,
    threshold: medal.target,
    iconUrl: medal.icon,
    unlocked: donationCount >= medal.target,
  }));
}