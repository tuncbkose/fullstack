import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (typeof height === 'string'
        && typeof weight === 'string'
        && !isNaN(Number(height))
        && !isNaN(Number(weight))){
        return res.json({
            height,
            weight,
            bmi: calculateBmi(Number(height), Number(weight))
        });
    } else { return res.json({error: 'malformatted parameters'}); }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises: hours } = req.body;
    if ( !target || !hours) return res.json({'error': 'parameters missing'});
    else if ( isNaN(Number(target)) || !Array.isArray(hours) || hours.some(isNaN)) return res.json({'error': 'malformatted parameters'});
    return res.json(calculateExercises(hours.map(h => Number(h)), Number(target)));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});