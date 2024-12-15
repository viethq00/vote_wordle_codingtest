import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interfaces/voteeApi.interface";

export function handleError(error: any, context: string) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      console.error(`${context} API Error: `, axiosError.response.data);
    } else {
      console.error(`${context} Network or Other error: `, axiosError.message);
    }
  } else {
    console.error(`${context} Unknow Error: `, error);
  }
}

//Generate a guess base on known contraints
/*
    - The idea is to randomize each slot with an English alphabet containing 26 characters,
    but make the randomization more precise by reducing the list of random characters based on constraints.
    
    - Base on the response of the guess word, the guess random API return a list of result for each character
    I'm going to utilize that result(absent, present, correct) to reducing the list of random.
*/

export function generateConstrainedWord(
  size: number,
  correctSlots: string[],
  absentChars: Set<string>
) {
  // The size is a mandatory parameter, and correctSlots is used to save the results that are "correct" for the corresponding slot index.
  // For example, correctSlots:
  // - For a word of size 6, if slot 2 is correct and the character is "n",
  // - the correctSlots array will look like ["", "", "n", "", "", ""]
  // The absentChars will be the list of characters to be excluded from the alphabet array.
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Step 1: Create a list of valid characters (to random in this list)
  const validChars = Array.from(alphabet).filter(
    (char) => !absentChars.has(char)
  );

  // Array to store the resulting characters to guess against the challenge guess word
  const result: string[] = [];

  //Array to store the a list of last random characters, so that the next random won't duplicate
  let lastRandomChar: string[] = [];

  //Step 2: Loop through each position in the word

  for (let i = 0; i < size; i++) {
    if (correctSlots[i]) {
      //If a correct character is known for this position, use it
      result.push(correctSlots[i]);
      // - the correctSlots array will look like ["", "", "n", "", "", ""]
    } else {
      //Create a temporary list of characters excluding the list of last random characters
      const randomPool = validChars.filter(
        (char) => !lastRandomChar.includes(char)
      );

      //Random select a character from the temporary list
      const randomIndex = Math.floor(Math.random() * randomPool.length);

      //Special case: Duplicate present with present slot | Duplicate present with correct slot
      /* - If this case happens, the random pool won't have enough character to random to 
                 craft the guessing word with equal size to the challenge guess word. */
      // (because at each random, we remove the already random character, maybe we have double "c" or double "r" for example)
      /* The case that said the index is out of bound, its the case when the randomPool is completely empty []
         so the randomIndex and the randomPool length will both be 0 */
      if (randomIndex >= randomPool.length) {
        while (result.length < size) {
          const randomDuplicateIndex = Math.floor(
            Math.random() * (lastRandomChar.length - 1)
          );
          result.push(lastRandomChar[randomDuplicateIndex]);
        }

        break;
      }

      const randomChar = randomPool[randomIndex];
      result.push(randomChar);
      lastRandomChar.push(randomChar);
    }
  }

  return result.join("");
}
