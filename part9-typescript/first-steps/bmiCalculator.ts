const calculateBmi = (heightInCm: number, weightInKg: number): string => {
    const ratio = weightInKg / (heightInCm / 100)**2;
    if (ratio < 18.5) return "Underweight";
    else if (ratio > 24.9) return "Overweight";
    return "Normal (healthy weight)";
}

console.log(calculateBmi(180, 74));
