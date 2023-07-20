interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
}

const calculateExercises = (hours: number[], target: number): Result => {
    const average = hours.reduce((acc, num) => acc+num) / hours.length;
    const trainingDays = hours.reduce((acc, num) => acc+Number(num!==0), 0);
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        target: target,
        average: average,
        success: average >= target,
        rating: 3,
        ratingDescription: "could be better"
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));