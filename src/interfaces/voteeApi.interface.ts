// Interfaces for API responses
export interface WordSegmentResponse {
  [index: number]: string;
}

export interface GuessResponse {
  slot: number;
  guess: string;
  result: "absent" | "present" | "correct";
}

export interface ErrorResponse {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  }[];
}
