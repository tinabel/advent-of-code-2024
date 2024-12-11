// Advent of Code 2024 - Day 2
import { input } from './input.js';
const convertInputs = () => {
    const data = input;
    return data.split('\n').map((line) => line.split(' ').map((num) => parseInt(num)));
};
const safeDirection = (line) => {
    const arrCopy = Array.from(line);
    const asc = line.join() == arrCopy.sort((a, b) => a - b).join();
    const desc = line.join() == arrCopy.sort((a, b) => b - a).join();
    return asc || desc;
};
const safeDifference = ({ line, min, max }) => {
    return line.slice(1).map((current, i) => Math.abs(current - line[i++])).every((diff) => diff >= min && diff <= max);
};
const isSafe = (line) => {
    return safeDirection(line) && safeDifference({ line, min: 1, max: 3 });
};
const removeAtIndex = (line, index) => {
    const copy = [...line];
    copy.splice(index, 1);
    return copy;
};
const safeDampen = (line) => {
    const results = [];
    line.forEach((item, index) => {
        results.push(isSafe(removeAtIndex(line, index)));
    });
    return results.includes(true);
};
export const partOne = () => {
    const data = convertInputs();
    return data.map((line) => isSafe(line)).filter((line) => line);
};
export const partTwo = () => {
    const data = convertInputs();
    const defaults = data.filter((line) => isSafe(line));
    const rejects = data.filter((line) => !isSafe(line));
    const dampened = [];
    rejects.forEach((line) => {
        dampened.push(safeDampen(line));
    });
    return defaults.concat(rejects.filter((line, index) => dampened[index]));
};
export const dayTwoResults = () => {
    console.log("Day Two Results:");
    console.log("Part One", partOne().length);
    console.log("Part Two", partTwo().length);
};
