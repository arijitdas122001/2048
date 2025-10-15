export const checkIfSpaceLeft = (grid: number[][]): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
};
export const getRandom = (): number[] => {
  let randRow = Math.floor(Math.random() * 4);
  let randCol = Math.floor(Math.random() * 4);
  return [randRow, randCol];
};
export const getRandomEntryPosition = (
  grid: number[][],
  isNewGame: boolean
): number[][] => {
  if (!checkIfSpaceLeft(grid)) {
    return grid;
  }
  let [rowFor2, colFor2] = getRandom();
  let [rowFor4, colFor4] = getRandom();
  if (isNewGame) {
    while (grid[rowFor4][colFor4] !== 0) {
      [rowFor4, colFor4] = getRandom();
    }
    grid[rowFor4][colFor4] = 4;
    while (grid[rowFor2][colFor2] !== 0) {
      [rowFor2, colFor2] = getRandom();
    }
    grid[rowFor2][colFor2] = 2;
  } else {
    let tileNo = Math.random() > 0.5 ? 2 : 4;
    if (tileNo === 4) {
      while (grid[rowFor4][colFor4] !== 0) {
        [rowFor4, colFor4] = getRandom();
      }
      grid[rowFor4][colFor4] = 4;
    } else {
      while (grid[rowFor2][colFor2] !== 0) {
        [rowFor2, colFor2] = getRandom();
      }
      grid[rowFor2][colFor2] = 2;
    }
  }
  return grid;
};
export const gridAfterPerformingAdditionForSameAdjTiles = (
  grid: number[][]
): number[][] => {
  let score: number = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] !== 0 && grid[i][j] == grid[i][j + 1]) {
        grid[i][j] = grid[i][j] * 2;
        score += grid[i][j];
        grid[i][j + 1] = 0;
      }
    }
  }
  return grid;
};
export const slideLeft = (grid: number[][]): number[][] => {
  let newGrid: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    let trackEmptyColIdx = 0;
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] !== 0) {
        newGrid[i][trackEmptyColIdx] = grid[i][j];
        trackEmptyColIdx++;
      }
    }
  }
  return newGrid;
};
export const slideRight = (grid: number[][]): number[][] => {
  let newGrid: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[i][3 - j];
    }
  }
  return newGrid;
};
export const slideUp = (grid: number[][]): number[][] => {
  let newGrid: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][3 - i];
    }
  }
  return newGrid;
};
export const slideDown = (grid: number[][]): number[][] => {
  let newGrid: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[3 - j][i];
    }
  }
  return newGrid;
};
export const shiftLeft = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllLeft = slideLeft(grid);
  let gridiAfterPerformingAddition = gridAfterPerformingAdditionForSameAdjTiles(
    gridAfterShiftingAllLeft
  );
  return slideLeft(gridiAfterPerformingAddition);
};
export const shiftRight = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllRight = slideRight(grid);
  let gridAfterPerformingRightSlide = shiftLeft(gridAfterShiftingAllRight);
  return slideRight(gridAfterPerformingRightSlide);
};
export const shiftUp = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllUp = slideUp(grid);
  let gridAfterPerformingUpSlide = shiftLeft(gridAfterShiftingAllUp);
  return slideDown(gridAfterPerformingUpSlide);
};
export const shiftDown = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllRight = slideDown(grid);
  let gridAfterPerformingDownSlide = shiftLeft(gridAfterShiftingAllRight);
  return slideUp(gridAfterPerformingDownSlide);
};
export const isSameGrid = (
  oldGrid: number[][],
  updatedGridAfterMove: number[][]
) => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (oldGrid[i][j] !== updatedGridAfterMove[i][j]) {
        return false;
      }
    }
  }
  return true;
};
export const checkIsGameOverWithNoMovesLeft = (grid: number[][]) => {
  // console.log("checking if game over with no moves left");
  if (
    !isSameGrid(grid, shiftLeft(grid)) ||
    !isSameGrid(grid, shiftRight(grid)) ||
    !isSameGrid(grid, shiftUp(grid)) ||
    !isSameGrid(grid, shiftDown(grid))
  ) {
    return false;
  }
  return true;
};
export const isFinalValueFound = (grid: number[][]): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
};
