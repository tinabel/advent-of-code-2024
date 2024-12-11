// Advent of Code 2024 - Day 4

import { input } from './input.js';

export const convertInput = () => {
    const data = input;
    return data.split(/\n/g).filter((line) => line.length > 0).map((line) => line.trim().split(""));
};

const matchXmas = (line: string[]) => {
  return (line.join("").match(/(XMAS)/g) ?? []).length + ([...line].reverse().join("").match(/(XMAS)/g) ?? []).length;
};

const vertical = (data: string[][]) => {
  const vertical: string[][] = Array.from(Array(data.length)).map((_v, _i) => []);

  data.forEach((line, i) => {
    line.forEach((item, index) => {
      vertical[index].push(item);
    });
  });

  return vertical;
};

const diagonal = (data: string[][], reverse: boolean = false) => {
  
  const diagonal = data.reduceRight((acc: string[][], curr: string[], i: number) => {
    if (reverse) {
      curr = curr.reverse();
    }

    curr.forEach((item, index) => {
      const position = index + (data.length - i - 1)
      if (!acc[position]) { acc[position] = [] }
      acc[position].unshift(item);
    })
  return acc;
  }, [] as string[][]);

  return diagonal;
};

const xmascount2 = (data: string[][]) => {  
  data.forEach((line: string[], i) => {});
}


const partTwo = (data: string[][]) => {
  let count: number = 0;

  
  data.forEach((line: string[], i) => {
    line.forEach((item: string, n) => {
      if (i + 1 >= data.length || i - 1 < 0) { return; }
      const topRight = data[i - 1][n + 1];
      const topLeft = data[i - 1][n - 1];
      const bottomRight = data[i + 1][n + 1];
      const bottomLeft = data[i + 1][n - 1];

      if (item === "A") {
        // if the starting item isn't A or X, and the center item is A

        if (topLeft === "M" && topRight === "S" && bottomLeft === "M" && bottomRight === "S") {
          /*
            M * S
            * A *
            M * S
          */ 
          count++;
        } 
        if (topLeft === "M" && topRight === "M" && bottomLeft === "S" && bottomRight === "S") {
        /*
            M * M
            * A *
            S * S
          */ 
          count++;
        }
        if (topLeft === "S" && topRight === "M" && bottomLeft === "S" && bottomRight === "M") {
          /*
            S * M
            * A *
            S * M
          */ 
          count++;
        }
        if (topLeft === "S" && topRight === "S" && bottomLeft === "M" && bottomRight === "M") {
          /*
            S * S
            * A *
            M * M
          */ 
          count++;
        }
      }
    });
  });

  return count;
}

const partOne = (data: string[][]) => {
  const count: boolean[] = []
  const h = data.reduce((acc, line) => acc + matchXmas(line), 0);
  const v = vertical(data).reduce((acc, line) => acc + matchXmas(line), 0);
  const d = diagonal(data, false).reduce((acc, line) => acc + matchXmas(line), 0);
  const dr = diagonal(data, true).reduce((acc, line) => acc + matchXmas(line), 0);

  return h + v + d + dr;
};


export const dayFourResults = () => {
  const data = convertInput();

  console.log("Day Four Results:");
  console.log(`Part One: ${partOne(data)}`);
  console.log(`Part Two: ${partTwo(data)}`);  
}
