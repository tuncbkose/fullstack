import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (typeof height === 'string'
        && typeof weight === 'string'
        && !isNaN(Number(height))
        && !isNaN(Number(weight))){
        res.json({
            height,
            weight,
            bmi: calculateBmi(Number(height), Number(weight))
        });
    } else { res.json({error: 'malformatted parameters'}); }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});