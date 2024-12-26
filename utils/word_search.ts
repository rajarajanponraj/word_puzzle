// utils/word_search.ts
export function generateWordSearchGrid(words: string[]): string[][] {
    const grid: string[][] = Array(10).fill(null).map(() => Array(10).fill(" "));
    words.forEach(word => {
      placeWordInGrid(grid, word);
    });
    fillRandomLetters(grid);
    return grid;
  }
  
  export function placeWordInGrid(grid: string[][], word: string): boolean {
    // Try to place the word horizontally or vertically randomly
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    const wordLength = word.length;
    let placed = false;
  
    while (!placed) {
      const row = Math.floor(Math.random() * grid.length);
      const col = Math.floor(Math.random() * grid[0].length);
  
      if (canPlaceWord(grid, row, col, word, direction)) {
        for (let i = 0; i < wordLength; i++) {
          if (direction === "horizontal") {
            grid[row][col + i] = word[i];
          } else {
            grid[row + i][col] = word[i];
          }
        }
        placed = true;
      }
    }
    return true;
  }
  
  function canPlaceWord(grid: string[][], row: number, col: number, word: string, direction: string): boolean {
    const wordLength = word.length;
    if (direction === "horizontal") {
      if (col + wordLength > grid[0].length) return false;
      for (let i = 0; i < wordLength; i++) {
        if (grid[row][col + i] !== " " && grid[row][col + i] !== word[i]) {
          return false;
        }
      }
    } else {
      if (row + wordLength > grid.length) return false;
      for (let i = 0; i < wordLength; i++) {
        if (grid[row + i][col] !== " " && grid[row + i][col] !== word[i]) {
          return false;
        }
      }
    }
    return true;
  }
  
  function fillRandomLetters(grid: string[][]): void {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === " ") {
          grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }
  }
  