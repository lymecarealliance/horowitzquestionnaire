function calculateHorowitzScore(section1, section3, section4PhysicalDays, section4MentalDays) {
  // Section 1 total
  let section1Total = Object.values(section1).reduce((a, b) => a + b, 0);

  // Section 2 bonus
  const bonusSymptoms = [3, 33, 18, 24, 37];
  let section2Total = bonusSymptoms.reduce((acc, id) => {
    return acc + (section1[id] === 3 ? 5 : 0);
  }, 0);

  // Section 3 total
  let section3Total = Object.values(section3).reduce((a, b) => a + b, 0);

  // Section 4 scoring
  function scoreDays(days) {
    if (days >= 0 && days <= 5) return 1;
    if (days >= 6 && days <= 12) return 2;
    if (days >= 13 && days <= 20) return 3;
    if (days >= 21 && days <= 30) return 4;
    return 0;
  }

  let section4Total = scoreDays(section4PhysicalDays) + scoreDays(section4MentalDays);

  // Final score
  let finalScore = section1Total + section2Total + section3Total + section4Total;

  // Interpretation
  let interpretation = "";
  if (finalScore >= 46) {
    interpretation = "High probability of a tick-borne disorder. Seek medical evaluation.";
  } else if (finalScore >= 21 && finalScore <= 45) {
    interpretation = "Possible tick-borne disorder. Seek medical evaluation.";
  } else {
    interpretation = "Not likely to have a tick-borne disorder.";
  }

  return {
    section1Total,
    section2Total,
    section3Total,
    section4Total,
    finalScore,
    interpretation
  };
}

// Example usage:
const section1Input = {
  3: 3,    // Fatigue
  18: 2,   // Joint pain
  24: 3,   // Tingling
  33: 3,   // Forgetfulness
  37: 1    // Sleep issues
  // add more if needed...
};

const section3Input = {
  44: 3,
  46: 2,
  48: 4
  // add more if needed...
};

const result = calculateHorowitzScore(section1Input, section3Input, 10, 5);
console.log(result);
