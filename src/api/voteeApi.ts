import axios from "axios";
import {
  GuessResponse,
  WordSegmentResponse,
} from "../interfaces/voteeApi.interface";
import { handleError } from "../utils/utils";

const BASE_URL = "https://wordle.votee.dev:8000";

//API for word segmentation
export async function segmentText(
  text: string
): Promise<WordSegmentResponse | void> {
  try {
    const response = await axios.post<WordSegmentResponse>(
      `${BASE_URL}/wordseg`,
      new URLSearchParams({ text })
    );
    return response.data;
  } catch (error) {
    handleError(error, "Segment Text");
  }
}

//API for guessing the daily puzzle
export async function guessDaily(
  guess: string,
  size: number
): Promise<GuessResponse[] | void> {
  try {
    const response = await axios.get<GuessResponse[]>(`${BASE_URL}/daily`, {
      params: {
        guess,
        size,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Daily Guess");
  }
}

//API for guessing the random puzzle
export async function guessRandom(
  guess: string,
  size: number,
  seed: number
): Promise<GuessResponse[] | void> {
  try {
    const response = await axios.get<GuessResponse[]>(`${BASE_URL}/random`, {
      params: {
        guess,
        size,
        seed,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error, "Random Guess");
  }
}

//API for guessing against the specific|selected word
export async function guessSpecific(
  word: string,
  guess: string
): Promise<GuessResponse[] | void> {
  try {
    const response = await axios.get<GuessResponse[]>(
      `${BASE_URL}/word/${word}`,
      {
        params: {
          guess,
        },
      }
    );
    return response.data;
  } catch (error) {
    handleError(error, "Selected|Specific Guess");
  }
}
