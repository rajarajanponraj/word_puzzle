/** routes/index.tsx */
import { generateWordSearchGrid } from "../utils/word_search.ts";
import WordSearchGame from "../islands/WordSearchGame.tsx";

const wordList = ["RUST", "GAME", "SEARCH", "CODE"];

export default function Home() {
  const grid = generateWordSearchGrid(wordList);

  return (
    <html>
      <head>
        <title>Word Search Game</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100 text-gray-800">
        <WordSearchGame grid={grid} wordList={wordList} />
      </body>
    </html>
  );
}
