//Create function to keep guessing word until the correct word is found (all result is correct)

import { guessDaily, guessRandom } from "../api/voteeApi";
import { generateConstrainedWord } from "../utils/utils";

export async function guessRandomUntilCorrect(size: number, seed: number) {
  let correctWord: string;
  let correctSlots = Array(size).fill("");
  const absentChars = new Set<string>();

  let isCorrectAll = false;

  while (!isCorrectAll) {
    const guess = generateConstrainedWord(size, correctSlots, absentChars);
    //After craft a randomized guessing word, pass it to the API to test
    const response = await guessRandom(guess, size, seed);

    console.log("Guessing response: ", response);
    if (response) {
      response.forEach(({ slot, guess: char, result }) => {
        if (result === "correct") {
          // - For a word of size 6, if slot 2 is correct and the character is "n",
          // - the correctSlots array will look like ["", "", "n", "", "", ""]
          correctSlots[slot] = char;
        } else if (result === "absent") {
          // The absentChars will be the list of characters to be excluded from the alphabet array.
          absentChars.add(char);
        }
      });

      isCorrectAll = response.every((res) => res.result === "correct");

      if (isCorrectAll) {
        console.log(`Correct word found: `, guess);
        correctWord = guess;
        break;
      }
    }
  }

  return correctWord;
}

export async function guessDailyUntilCorrect(size: number) {
  let correctWord: string;
  let correctSlots = Array(size).fill("");
  const absentChars = new Set<string>();

  let isCorrectAll = false;

  while (!isCorrectAll) {
    const guess = generateConstrainedWord(size, correctSlots, absentChars);
    //After craft a randomized guessing word, pass it to the API to test
    const response = await guessDaily(guess, size);

    console.log("Guessing response: ", response);
    if (response) {
      response.forEach(({ slot, guess: char, result }) => {
        if (result === "correct") {
          // - For a word of size 6, if slot 2 is correct and the character is "n",
          // - the correctSlots array will look like ["", "", "n", "", "", ""]
          correctSlots[slot] = char;
        } else if (result === "absent") {
          // The absentChars will be the list of characters to be excluded from the alphabet array.
          absentChars.add(char);
        }
      });

      isCorrectAll = response.every((res) => res.result === "correct");

      if (isCorrectAll) {
        console.log(`Correct word found: `, guess);
        correctWord = guess;
        break;
      }
    }
  }

  return correctWord;
}
