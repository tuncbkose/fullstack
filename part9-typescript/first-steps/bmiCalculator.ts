interface BmiInput {
    heightInCm: number;
    weightInKg: number;
}

const parseBmiArguments = (args: string[]): BmiInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
    const heightInCm = Number(args[2]);
    const weightInKg = Number(args[3]);
    if (!isNaN(heightInCm) && !isNaN(weightInKg)) {
        return {
            heightInCm,
            weightInKg
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }

}

const calculateBmi = (heightInCm: number, weightInKg: number): string => {
    const ratio = weightInKg / (heightInCm / 100)**2;
    if (ratio < 18.5) return "Underweight";
    else if (ratio > 24.9) return "Overweight";
    return "Normal (healthy weight)";
}

if ( require.main === module ){
    try {
        const { heightInCm, weightInKg } = parseBmiArguments(process.argv);
        console.log(calculateBmi(heightInCm, weightInKg));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export { calculateBmi };