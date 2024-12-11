// Advent of Code 2024 - Day 3
import { input } from './input.js';
const convertInput = () => {
    const data = input.replace(/\n/g, '');
    return data;
};
const findMul = (data) => {
    const regexr = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    return [...data.matchAll(regexr)].map(match => [parseInt(match[1]), parseInt(match[2])]);
};
const findExecutables = () => {
    const data = input.replace(/\n/g, '');
    return data.split(/(do\(\))/gm).flatMap((chunk) => chunk.split(/(don\'t\(\))/gm));
};
const addItUp = (arr) => {
    return arr.reduce((acc, [a, b]) => acc + (a * b), 0);
};
const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
const partOne = () => {
    const data = convertInput();
    const mulArr = findMul(data);
    return addItUp(mulArr);
};
const partTwo = () => {
    const exArr = findExecutables();
    const executableText = [];
    let brake = false;
    let skip = false;
    let go = true;
    exArr.forEach((item, i) => {
        if (!brake && (item.includes("don't()"))) {
            brake = true;
            go = false;
        }
        else if (!go && (item.includes("do()"))) {
            brake = false;
            go = true;
        }
        if (brake && !item.includes("don't()")) {
            skip = true;
        }
        else if (go && !item.includes("do()")) {
            skip = false;
        }
        if (!skip) {
            executableText.push(item);
        }
    });
    const result = executableText.flatMap(text => findMul(text));
    return addItUp(result);
};
export const dayThreeResults = () => {
    console.log("Day 3 Results:");
    console.log("Part One: ", partOne());
    console.log("Part Two: ", partTwo());
    return {
        partOne: partOne(),
        partTwo: partTwo()
    };
};
