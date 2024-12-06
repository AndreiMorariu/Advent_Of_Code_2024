import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_6/input.txt", { encoding: "utf-8" });

const board = [];
const visited = new Set();
let guardPosition = "";
let guardDirection = "up";

const guardDirectionMap = {
	up: "right",
	right: "down",
	down: "left",
	left: "up",
};

for (const row of input.trim().split("\r\n")) {
	board.push([...row]);
}

const numRows = board.length;
const numCols = board[0].length;

for (let i = 0; i < board.length; i++) {
	if (guardPosition !== "") break;
	const row = board[i];

	for (let j = 0; j < row.length; j++) {
		const element = board[i][j];

		if (element === "^") {
			guardPosition = `${i},${j}`;
			visited.add(guardPosition);
		}
	}
}

while (true) {
	const hasLeft = tryMoveGuard();
	if (hasLeft) break;
}

function hasLeft(guardPosition) {
	const [i, j] = guardPosition.split(",").map(Number);

	return i < 0 || i >= numRows || j < 0 || j >= numCols;
}

function tryMoveGuard() {
	let [i, j] = guardPosition.split(",").map(Number);

	if (guardDirection === "down" && hasLeft(`${i + 1},${j}`)) return true;

	if (guardDirection === "up" && hasLeft(`${i - 1},${j}`)) return true;

	if (guardDirection === "right" && hasLeft(`${i},${j + 1}`)) return true;

	if (guardDirection === "left" && hasLeft(`${i},${j - 1}`)) return true;

	if (guardDirection === "up") {
		if (board[i - 1][j] === "#") {
			guardDirection = guardDirectionMap[guardDirection];
			return;
		}
		guardPosition = `${i - 1},${j}`;
	}

	if (guardDirection === "down") {
		if (board[i + 1][j] === "#") {
			guardDirection = guardDirectionMap[guardDirection];
			return;
		}
		guardPosition = `${i + 1},${j}`;
	}

	if (guardDirection === "left") {
		if (board[i][j - 1] === "#") {
			guardDirection = guardDirectionMap[guardDirection];
			return;
		}
		guardPosition = `${i},${j - 1}`;
	}

	if (guardDirection === "right") {
		if (board[i][j + 1] === "#") {
			guardDirection = guardDirectionMap[guardDirection];
			return;
		}
		guardPosition = `${i},${j + 1}`;
	}

	visited.add(guardPosition);
	return false;
}

console.log(visited.size);
