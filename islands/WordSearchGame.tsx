import { useState, useEffect } from "preact/hooks";

interface WordSearchGameProps {
  grid: string[][];
  wordList: string[];
}

export default function WordSearchGame({ grid, wordList }: WordSearchGameProps) {
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [wordsFound, setWordsFound] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const colors = ["bg-green-400", "bg-blue-400", "bg-red-400", "bg-yellow-400"];
  const wordColors = wordList.reduce((acc, word, index) => {
    acc[word] = colors[index % colors.length];
    return acc;
  }, {} as Record<string, string>);

  useEffect(() => {
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Object.keys(wordsFound).length === wordList.length) {
      setIsCompleted(true);
    }
  }, [wordsFound]);

  const handleCellMouseDown = (i: number, j: number) => {
    setIsDragging(true);
    selectCell(i, j);
  };

  const handleCellMouseEnter = (i: number, j: number) => {
    if (isDragging) {
      selectCell(i, j);
    }
  };

  const handleCellMouseUp = () => {
    setIsDragging(false);
    checkWords();
    clearSelection();
  };

  const selectCell = (i: number, j: number) => {
    const cellId = `${i}-${j}`;
    if (!selectedCells.includes(cellId)) {
      setSelectedCells((prev) => [...prev, cellId]);
    }
  };

  const checkWords = () => {
    const selectedWord = selectedCells
      .map((id) => {
        const [i, j] = id.split("-").map(Number);
        return grid[i][j];
      })
      .join("");

    if (wordList.includes(selectedWord) && !wordsFound[selectedWord]) {
      setWordsFound((prev) => ({ ...prev, [selectedWord]: wordColors[selectedWord] }));
    }
  };

  const clearSelection = () => {
    setSelectedCells([]);
  };

  const restartGame = () => {
    setSelectedCells([]);
    setWordsFound({});
    setTimer(0);
    setIsCompleted(false);
  };

  return (
    <div
    className="container mx-auto p-4 select-none"
    style={{
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none",
    }}
  >
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Word Search Game</h1>
        <div className="text-center mb-4">
          <span className="text-lg">Find these words:</span>
          <ul id="word-list" className="list-none inline-block text-left ml-4">
            {wordList.map((word) => (
              <li
                key={word}
                className={`inline-block mx-2 px-2 py-1 rounded ${
                  wordsFound[word]
                    ? `${wordsFound[word]} text-white line-through`
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {word}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mb-4 text-xl">
          Timer: <span className="font-bold text-red-500">{timer}s</span>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Restart
          </button>
        </div>
        <div className="flex justify-center">
          <table className="table-auto border-collapse">
            <tbody>
              {grid.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    const cellId = `${i}-${j}`;
                    const isSelected = selectedCells.includes(cellId);
                    const isPartOfFoundWord = Object.entries(wordsFound).some(([word, color]) =>
                      word.split("").some((_, index) => {
                        const [x, y] = selectedCells[index]?.split("-").map(Number) || [];
                        return `${x}-${y}` === cellId;
                      })
                    );

                    return (
                      <td
                        key={j}
                        className={`w-12 h-12 border text-xl font-bold text-center cursor-pointer ${
                          isSelected
                            ? "bg-yellow-300"
                            : isPartOfFoundWord
                            ? wordsFound[grid[i][j]] || ""
                            : ""
                        }`}
                        onMouseDown={() => handleCellMouseDown(i, j)}
                        onMouseEnter={() => handleCellMouseEnter(i, j)}
                        onMouseUp={handleCellMouseUp}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Completion */}
      {isCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-lg mb-4">You found all the words!</p>
            <button
              onClick={restartGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
