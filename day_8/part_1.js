import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_8/input.txt", { encoding: "utf-8" });
const splittedInput = input.trim().replace(/\r/g, "").split("\n");
const board = splittedInput.map(row => [...row]);

const numCols = board.length;
const numRows = board[0].length;

const freqMap = {};

for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const element = board[i][j];
    if (element === ".") continue;
    if (!freqMap[element]) freqMap[element] = [];
    freqMap[element].push([i, j]);
  }
}

const antiNodes = [];

for (const nodes of Object.values(freqMap)) {
  if (nodes.length <= 1) continue;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;

      const row = nodes[i];
      const col = nodes[j];

      const antiNode1 = [row[0] * 2 - col[0], row[1] * 2 - col[1]];
      if (antiNodes.findIndex(x => x[0] === antiNode1[0] && x[1] === antiNode1[1]) < 0 &&
        antiNode1[0] >= 0 && antiNode1[1] >= 0 && antiNode1[0] < numCols && antiNode1[1] < numRows) antiNodes.push(antiNode1);

      const antiNode2 = [col[0] * 2 - row[0], col[1] * 2 - row[1]];
      if (antiNodes.findIndex(x => x[0] === antiNode2[0] && x[1] === antiNode2[1]) < 0 &&
        antiNode2[0] >= 0 && antiNode2[1] >= 0 && antiNode2[0] < numCols && antiNode2[1] < numRows) antiNodes.push(antiNode2);
    }
  }
}

console.log(antiNodes.length);

