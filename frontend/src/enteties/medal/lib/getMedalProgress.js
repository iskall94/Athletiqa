import { MedalsSteps, LockedMedal } from "../config/medalsSteps";

export default function getMedalProgress(donationsCount) {
  let currentMedal = null;
  let nextMedal = null;

  for (let i = 0; i < MedalsSteps.length; i++) {
    const medal = MedalsSteps[i];

    if (donationsCount >= medal.target) {
      currentMedal = medal;
    } else {
      nextMedal = medal;
      break;
    }
  }

  const hasNoDonations = donationsCount === 0;
  const hasAnyMedal = currentMedal !== null;
  const isCompletedAll = nextMedal=== null && currentMedal !== null;

  const displayMedal = hasNoDonations ? LockedMedal : nextMedal || currentMedal;
  const isDisplayMedalLocked = hasNoDonations || Boolean(nextMedal);

  return {
    currentMedal: currentMedal,
    nextMedal: nextMedal,
    currentCount: donationsCount,
    targetCount: nextMedal ? nextMedal.target : currentMedal?.target || 0,
    leftToNext: nextMedal ? nextMedal.target - donationsCount : 0,
    isCompletedAll,
    hasAnyMedal,
    displayMedal,
    hasNoDonations,
    isDisplayMedalLocked
  };
}
