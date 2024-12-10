import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_10/input.txt", { encoding: "utf-8" });
const splittedInput = input.trim().replace(/\r/g, "").split("\n");
const map = splittedInput.map((row) => [...row]);

const numRows = map.length;
const numCols = map[0].length;

let totalScore = 0;
for (let i = 0; i < numRows; i++) {
	for (let j = 0; j < numCols; j++) {
		if (map[i][j] === "0") totalScore += BFS(i, j);
	}
}

console.log(totalScore);

function BFS(x, y) {
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	];

	const visited = new Set();
	const queue = [[x, y]];
	visited.add(`${x},${y}`);

	let score = 0;

	while (queue.length > 0) {
		const [cx, cy] = queue.shift();

		if (map[cx][cy] === "9") score++;

		for (const [dx, dy] of directions) {
			const nx = cx + dx;
			const ny = cy + dy;

			if (
				nx >= 0 &&
				nx < numRows &&
				ny >= 0 &&
				ny < numCols &&
				!visited.has(`${nx},${ny}`) &&
				parseInt(map[nx][ny]) === parseInt(map[cx][cy]) + 1
			) {
				visited.add(`${nx},${ny}`);
				queue.push([nx, ny]);
			}
		}
	}

	return score;
}
