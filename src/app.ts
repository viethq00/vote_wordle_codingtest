import express, { Request, Response } from "express";
import {
  guessDailyUntilCorrect,
  guessRandomUntilCorrect,
} from "./service/service";

const app = express();
const port = 3000;

//Routes handlers with proper type annotations

app.get("/guess-random", async (req: Request, res: Response) => {
  const { size } = req.query;
  console.log("\n ---Guess Random ---");

  if (!Number(size)) {
    return res.status(400).send({
      error: `Params 'size' is not defined or is empty`,
    });
  }

  const seed = Math.floor(Math.random() * 1000); //Generate a random seed
  console.log(`Using seed: ${seed}`);
  const result = await guessRandomUntilCorrect(Number(size), seed);

  res.status(200).send({
    word_found: result,
  });
});

app.get("/guess-daily", async (req: Request, res: Response) => {
  const { size } = req.query;
  console.log("\n ---Guess Daily ---");
  if (!Number(size)) {
    return res.status(400).send({
      error: `Params 'size' is not defined or is empty`,
    });
  }

  const result = await guessDailyUntilCorrect(Number(size));

  res.status(200).send({
    word_found: result,
  });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
