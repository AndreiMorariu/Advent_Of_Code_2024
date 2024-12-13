import * as fs from "node:fs/promises";

const input = await fs.readFile("input.txt", { encoding: "utf-8" });
const splittedInput = input.trim().replace(/\r/g, "").split("\n");
const region = splittedInput.map(i => [...i]);

const numRows = region.length;
const numCols = region[0].length;

const visited = Array.from({ length: numRows }, () => Array(numCols).fill(false));

let totalPrice = 0;
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    if (visited[i][j]) continue;
    const { area, perimeter } = BFS(i, j, region);
    totalPrice += area * perimeter;
  }
}

console.log(totalPrice);

function BFS(x, y, grid) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  const queue = [[x, y]];
  const visitedCells = new Set();
  visitedCells.add(`${x},${y}`);
  visited[x][y] = true;

  let area = 0;
  let perimeter = 0;
  const regionLabel = grid[x][y];


  while (queue.length > 0) {
    const [x2, y2] = queue.shift();
    area++;


    for (const [dx, dy] of directions) {
      const nx = x2 + dx;
      const ny = y2 + dy;

      if (nx >= 0 && nx < numRows && ny >= 0 && ny < numCols) {
        if (grid[nx][ny] === regionLabel && !visitedCells.has(`${nx},${ny}`)) {
          queue.push([nx, ny]);
          visitedCells.add(`${nx},${ny}`);
          visited[nx][ny] = true;
        }
      } else {
        perimeter++;
      }

      if (nx >= 0 && nx < numRows && ny >= 0 && ny < numCols) {
        if (grid[nx][ny] !== regionLabel) {
          perimeter++;
        }
      }
    }
  }

  return { area, perimeter };
}


