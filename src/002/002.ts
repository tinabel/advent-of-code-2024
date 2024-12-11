// Advent of Code 2024 - Day 2

import { input } from './input.js';

const convertInputs = () => {
    const data = input;
  return data.split('\n').map((line) => line.split(' ').map((num) => parseInt(num)));
};

const safeDirection = (line: number[]) => {
    const arrCopy = Array.from(line);
    const asc = line.join() == arrCopy.sort((a, b) => a - b).join();
    const desc = line.join() == arrCopy.sort((a, b) => b - a).join();
    
    return asc || desc;
}


const safeDifference = ({line, min, max}: {line: number[], min: number, max: number}) => {
    return line.slice(1).map((current: number, i: number) => Math.abs(current - line[i++])).every((diff: number) => diff >= min && diff <= max);
}

const isSafe = (line: number[]) => {
    return safeDirection(line) && safeDifference({line, min: 1, max:3})
}

const removeAtIndex = (line: number[], index: number) => {
    const copy = [...line];
    copy.splice(index, 1);
    return copy;
};

const safeDampen = (line: number[]) => {
    const results: boolean[] = [];
    line.forEach((item, index)=> {
        results.push(isSafe(removeAtIndex(line, index)))

    });
    return results.includes(true);
};

export const partOne = () => {
    const data = convertInputs();

    return data.map((line: number[]) => isSafe(line)).filter((line: boolean) => line);
};

export const partTwo = () => {
    const data = convertInputs();

    const defaults = data.filter((line) => isSafe(line));
    const rejects =  data.filter((line) => !isSafe(line));
    const dampened: boolean[] = [];
    rejects.forEach((line) => {
        dampened.push(safeDampen(line));
    });
    return defaults.concat(rejects.filter((line, index) => dampened[index]));
};

export const dayTwoResults = () => {
    console.log("Day Two Results:");
    console.log("Part One", partOne().length);
    console.log("Part Two", partTwo().length);
}