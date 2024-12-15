# votee_wordle_codingtest

1. To run the project, extract the zip file.
2. Open the code in any IDE.
3. Open a terminal in the folder location, and run `npm install`.
4. After successfully installing the dependencies, in the folder location terminal, run `npm run start`.
5. In the README.md file, you only need the string of curl to call the API

These are the curl commands to test on Postman:
- Guess random: 
    ```bash
    Copy this: curl --location 'http://localhost:3000/guess-random?size=6'
    ```
- Guess daily:
    ```bash
    Copy this: curl --location 'http://localhost:3000/guess-daily?size=6'
    ```
