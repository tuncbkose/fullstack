interface ExerciseInput {
    target: number;
    hours: number[];
}

interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const [target, ...hours] = args.slice(2).map(s => Number(s));
    if (!isNaN(target) && !hours.some(isNaN)){
        return {
            target,
            hours
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (hours: number[], target: number): Result => {
    const average = hours.reduce((acc, num) => acc+num) / hours.length;
    const trainingDays = hours.reduce((acc, num) => acc+Number(num!==0), 0);
    return {
        periodLength: hours.length,
        trainingDays,
        target,
        average,
        success: average >= target,
        rating: 3,
        ratingDescription: "could be better"
    }
}

try {
    const { target, hours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}