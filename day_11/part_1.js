import * as fs from "node:fs/promises";

const input = await fs.readFile("./day_11/input.txt", { encoding: "utf-8" });
const stones = input.trim().split(" ");

for (let i = 0; i < 25; i++) {
  for (let j = 0; j < stones.length; j++) {
    const element = stones[j];
    if (element === "0") {
      stones[j] = "1";
    } else if (element.length % 2 === 0) {
      let firstHalf = element.substring(0, Math.floor(element.length / 2));
      let secondHalf = element.substring(Math.floor(element.length / 2));
      if (/^0+$/.test(secondHalf)) secondHalf = "0";
      if (secondHalf[0] === "0") {
        const indexOfDigitNotZero = secondHalf.split("").findIndex(char => char !== "0");
        secondHalf = secondHalf.substring(indexOfDigitNotZero);
      }
      stones[j] = firstHalf;
      stones.splice(j + 1, 0, secondHalf);
      j++;
    } else {
      stones[j] = String(parseInt(element) * 2024);
    }
  }
}

console.log(stones.length);
