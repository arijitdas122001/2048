export const checkIfSpaceLeft = (grid: number[][]): boolean => {
  let row=grid.length;
  let col=row
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 0) {
        return true;
      }
    }
  }
  return false;
};
export const getRandom = (grid:number[][]): number[] => {
   let row=grid.length;
  let col=row;
  // console.log(`row ${row} col ${col}`)
  let randRow = Math.floor(Math.random() * row);
  let randCol = Math.floor(Math.random() * col);
  return [randRow, randCol];
};
export const getRandomEntryPosition = (
  grid: number[][],
  isNewGame: boolean
): number[][] => {
  
  if (!checkIfSpaceLeft(grid)) {
    return grid;
  }
  let [rowFor2, colFor2] = getRandom(grid);
  let [rowFor4, colFor4] = getRandom(grid);
  if (isNewGame) {
    while (grid[rowFor4][colFor4] !== 0) {
      [rowFor4, colFor4] = getRandom(grid);
    }
    grid[rowFor4][colFor4] = 4;
    while (grid[rowFor2][colFor2] !== 0) {
      [rowFor2, colFor2] = getRandom(grid);
    }
    grid[rowFor2][colFor2] = 2;
  } else {
    let tileNo = Math.random() > 0.5 ? 2 : 4;
    if (tileNo === 4) {
      while (grid[rowFor4][colFor4] !== 0) {
        [rowFor4, colFor4] = getRandom(grid);
      }
      grid[rowFor4][colFor4] = 4;
    } else {
      while (grid[rowFor2][colFor2] !== 0) {
        [rowFor2, colFor2] = getRandom(grid);
      }
      grid[rowFor2][colFor2] = 2;
    }
  }
  return grid;
};
export const gridAfterPerformingAdditionForSameAdjTiles = (
  grid: number[][]
): number[][] => {
   let row=grid.length;
  let col=row;
  let score: number = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col-1; j++) {
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
   let row=grid.length;
  let col=row;
  let newGrid: number[][] = Array.from({ length: row }, () => Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    let trackEmptyColIdx = 0;
    for (let j = 0; j < col; j++) {
      if (grid[i][j] !== 0) {
        newGrid[i][trackEmptyColIdx] = grid[i][j];
        trackEmptyColIdx++;
      }
    }
  }
  return newGrid;
};
export const slideRight = (grid: number[][]): number[][] => {
  let row=grid.length;
  let col=row;
  let newGrid: number[][] = Array.from({ length: row }, () => Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      newGrid[i][j] = grid[i][col-1- j];
    }
  }
  return newGrid;
};
export const slideUp = (grid: number[][]): number[][] => {
  let row=grid.length;
  let col=row;
  let newGrid: number[][] = Array.from({ length: row }, () => Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      newGrid[i][j] = grid[j][row-1- i];
    }
  }
  return newGrid;
};
export const slideDown = (grid: number[][]): number[][] => {
  let row=grid.length;
  let col=row;
  let newGrid: number[][] = Array.from({ length: row }, () => Array(col).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      newGrid[i][j] = grid[col-1- j][i];
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
  let row=oldGrid.length;
  let col=row;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
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
  let row=grid.length;
  let col=row;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
};
