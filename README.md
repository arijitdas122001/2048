# 2048 game made with react+vite-engine
**Url :** 
## what is 2048 game
  The 2048 game is a simple yet addictive single-player puzzle game that has taken the internet by storm. It's a great way to challenge yourself mentally and improve your strategic thinking

## 2048 gameplay instructions
  * There is a n*n grid which can be filled with any number. Initially two random cells are filled with 2 or 4 in it. Rest cells are empty. 

  *  We have to press any one of four keys to move up, down, left, or right. When we press any key, the elements of the cell move in that direction such that if any two identical numbers are contained in that particular row (in case of moving left or right) or column (in case of moving up and down) they get add up and extreme cell in that direction fill itself with that number and rest cells goes empty again.

  * After this grid slideLeftion any random empty cell gets itself filled with 2 or 4.

  * Following the above process we have to double the elements by adding up and make 2048 in any of the cell. If we are able to do that we wins.

  * But if during the game there is no empty cell left to be filled with a new 2 or 4, then the game goes over.  

## Features and gameplay in our website 
  Like mentioned above we also have the same functionalities with two extra things that is our board is configurable so you can choose according to you, also there is a score where you can keep track of you score, like when one cell with value 2 and 2 colide your score will be 4 and then when 4 and 4 will colide score will be 12 and so on...

## Running the game
   1. Go to the website by default you will be assigned 4*4 grid, you can immediately start the game

   2. If you want to configure your board size just enter in the row and column box(should be equal) you will see the gui changing , but you have to click on the set new grid button on the right side and box will resize according to that.

   3. If you want to start the new game just click the new game button it will start a new game

## Installation
   If you want to visit the website just go on the url mentioned above. but in case you want see the code and have it in your local machine please follow the below instructions.

   **Prerequisites** :
    nodeJs and git should be installed in your system

   * Open the folder where you want to clone the particular project
   * copy the below command and run it in the Ide terminal for the particular command

    git clone git@github.com:arijitdas122001/2048.git

   * The whole project should be there in you local machine, then in the terminal run the following command 
    
    npm install

  this command will install all the required packages you need to run the pogramm
  
  * Once you done with the previous step , now it's time to run the code in the browser for that 
   
   ```
    npm run dev
  ```

  once you will run this command one link will come, just go to that link and boom you will be able to see the code running.

  ---

##  Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + TypeScript |
| Styling | TailwindCSS |
| Build Tool | Vite |
| Notifications | React Toastify |
---

## Folder Structure
```
src/
├── components/
│ └── NumberBox.tsx # Single tile component with dynamic styling
├── logic/
│ └── logicalFunctions.ts # Core 2048 logics and movement logic
├── pages/
│ └── Dashboard.tsx # Main UI and game control logic
  
  ```

## Game Logic
 ### 1️⃣ Grid Initialization
When the game starts, an empty grid (2D array of zeros) is generated.  
Two random cells are filled with either `2` or `4`. the bellow whole logic lies around assigning 2 and 4 in random positions

Dashboard.tsx
```ts
const getEmptyGrid = (rows, cols) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

 const [grid, setGrid] = useState<number[][]>(
    getRandomEntryPosition([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true)
  );
```
logicalFunctons.tsx

```ts
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
  // when it is for a new game we have to assign both
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
    //when in the middle of the game we have to assign either 2 or 4

    //putting the possiblity of 2 by 50% and 4 by 50%
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
```
### Main movement logic 
whenever the window receives and key board event then, we are call the onKeyEvent() function
  ```ts
  useEffect(() => {
    window.addEventListener("keydown", onKeyEvent);
    return () => {
      window.removeEventListener("keydown", onKeyEvent);
    };
  });
  ```
  here for every arrow key we are calling it's particular function, also calculateScore() function which is responsible for adding the score
```ts
const onKeyEvent = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        performUpAction();
        calculateScore();
        break;
      case "ArrowDown":
        performDownAction();
        calculateScore();
        break;
      case "ArrowLeft":
        performLeftAction();
        calculateScore();
        break;
      case "ArrowRight":
        performRightAction();
        calculateScore();
        break;

      default:
        break;
    }
  };
  ```

  let's see for every arrow key

  **imp**

    setGrid() and checkingEndingStatus() is common for every arrow key function it is setting the grid with the updated values after every operation and checking if we have more moves left or not
  * Left arrow key

  Dashboard.tsx
   ```ts
   const performLeftAction = () => {
    const gridAfterLeftOp = shiftLeft(grid);
    setGrid(getRandomEntryPosition(gridAfterLeftOp, false));
    checkGameEndingStatus(gridAfterLeftOp);
  };
  ```
  
  * **const slideLeft = (board) =>** ...: Slides all non-zero tiles to the left side of each row, filling the resulting gaps on the right with 0. It does not perform any merging.It iterates through each row.It creates a new row by only adding non-zero values, effectively shifting them left.Example: [2, 0, 2, 4] becomes [2, 2, 4, 0].
  * **const gridAfterPerformingAdditionForSameAdjTiles = (board) =>** ...: gridAfterPerformingAdditionForSameAdjTiless adjacent, equal-valued tiles in each row. It does not perform any slideLeftion.It iterates through each row, comparing a cell j with the one immediately to its right j + 1.If they are equal and non-zero, the left cell board[i][j] is doubled ($*2$), and the right cell board[i][j+1] is set to zero ($\mathbf{0}$).Example: [2, 2, 4, 0] becomes [4, 0, 4, 0].
  * **export const slideLeft = (board) =>** ...: Implements the full Move Left action:newBoard1 = slideLeft(board): Slides all tiles left. ([2, 0, 2, 4] $\to$ [2, 2, 4, 0])newBoard2 = gridAfterPerformingAdditionForSameAdjTiles(newBoard1): gridAfterPerformingAdditionForSameAdjTiless adjacent, equal tiles. ([2, 2, 4, 0] $\to$ [4, 0, 4, 0])return slideLeft(newBoard2): slideLeftes a second time to slide any newly created $\mathbf{0}$ gaps to the right. ([4, 0, 4, 0] $\to$ [4, 4, 0, 0])

  
  logicalFunctions.tsx
  ```ts
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
  export const shiftLeft = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllLeft = slideLeft(grid);
  let gridiAfterPerformingAddition = gridAfterPerformingAdditionForSameAdjTiles(
    gridAfterShiftingAllLeft
  );
  return slideLeft(gridiAfterPerformingAddition);
};
  ```

* Right Arrow Key

Dashboard.tsx

```ts
const performRightAction = () => {
    const gridAfterRightOp = shiftRight(grid);
    setGrid(getRandomEntryPosition(gridAfterRightOp, false));
    checkGameEndingStatus(gridAfterRightOp);
  };
```

The Logic of moveRight
To move tiles to the right, you don't need to write entirely new slideLeftRight and gridAfterPerformingAdditionForSameAdjTilesRight functions. Instead, you can use board transformations to make the problem look like a left move:

**slideRight:** You flip the board horizontally using slideRight(board). This makes the right side of the original board become the left side of the slideRightd board.
 * Original Row (Move Right): {[2, 0, 0, 2]} 


 * **slideRightd Row:** {[2, 0, 0, 2]}$ (Now you want to move the tiles left).
 
 * **shiftLeft:** You apply the proven shiftLeft logic to the slideRightd board. This correctly slideLeftes and gridAfterPerformingAdditionForSameAdjTiless tiles on what was the right side of the original board.Applying 

 **shiftLeft:** {[4, 0, 0, 0]}slideRight Back: You flip the board back using slideRight(newBoard). This restores the board to its correct orientation, and the gridAfterPerformingAdditionForSameAdjTilesd/slideLefted tiles are now on the right.
 
 slideRightd Back (Final Result): $\mathbf{[0, 0, 0, 4]}$

logicalFunctions.ts

```ts
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

export const shiftRight = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllRight = slideRight(grid);
  let gridAfterPerformingRightSlide = shiftLeft(gridAfterShiftingAllRight);
  return slideRight(gridAfterPerformingRightSlide);
};
```
 * Up Arrow Key

 Dashboard.tsx

 ```ts
 const performUpAction = () => {
    // console.log("perfoming up action");
    const gridAfterUpOp = shiftUp(grid);
    setGrid(getRandomEntryPosition(gridAfterUpOp, false));
    checkGameEndingStatus(gridAfterUpOp);
  };
 ```

 logicalFunctions.ts

 ```ts
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

 export const shiftUp = (grid: number[][]): number[][] => {
  let gridAfterShiftingAllUp = slideUp(grid);
  let gridAfterPerformingUpSlide = shiftLeft(gridAfterShiftingAllUp);
  return slideDown(gridAfterPerformingUpSlide);
};
 ```

# 2048 Game Logic Implementation

This module contains the core JavaScript functions required to manage the 2048 game state on a 4x4 grid. The key design principle is **code reuse** through board transformations (rotation and reversal).

## Core Concepts

* **Board Representation:** A 4x4 array of integers, where `0` represents an empty cell.

* **Movement Abstraction:** All four movement directions (`Up`, `Down`, `Left`, `Right`) are implemented by relying on a single, primary function: `shiftLeft`.

## Functions Breakdown

### 1. Board Initialization and Generation

| Function | Purpose | 
 | ----- | ----- | 
| `getEmptyBoard()` | Returns a fresh `4x4` board filled with zeros. | 
| `isFull(board)` | Checks if the board has any empty cells (`0`). | 
| `generateRandom(board)` | Places a new tile (always `2`) onto a random empty spot. | 
| `checkWin(board)` | Returns `true` if the value `2048` is present anywhere on the board. | 
| `isOver(board)` | Checks if the game is over. The game ends if the board is full **AND** no moves in any direction are possible (i.e., no slides or gridAfterPerformingAdditionForSameAdjTiless can occur). | 

### 2. Primary Movement Logic (`shiftLeft`)

`shiftLeft` is the most important function, as it handles the complete slide and gridAfterPerformingAdditionForSameAdjTiles for a single row, moving tiles to the left.

The process for `shiftLeft` involves three steps:

1. **`slideLeft(board)`:** Shifts all non-zero tiles to the left, filling gaps with zeros.

2. **`gridAfterPerformingAdditionForSameAdjTiles(board)`:** Doubles adjacent, equal-valued tiles (`2, 2` $\to$ `4, 0`).

3. **`slideLeft(board)` (Again):** Shifts the newly created zeros from merging back to the right.

### 3. Transformation-Based Movement

The other three directions reuse the `shiftLeft` logic by temporarily transforming the board's orientation.

#### **Move Right**

Movement to the right is achieved by flipping the board horizontally (`slideRight`), applying the left logic, and then flipping it back.

$$
\text{moveRight}(\text{board}) = \text{slideRight}(\text{shiftLeft}(\text{slideRight}(\text{board})))
$$

| Step | Transformation | Result | 
 | ----- | ----- | ----- | 
| 1 | `slideRight()` | Flips the board horizontally, making the **right** edge the **left** edge. | 
| 2 | `shiftLeft()` | Slides and gridAfterPerformingAdditionForSameAdjTiless tiles towards this temporary left edge. | 
| 3 | `slideRight()` | Flips the board back, placing the slid/gridAfterPerformingAdditionForSameAdjTilesd tiles on the **right**. | 

#### **Move Up**

Movement up is achieved by rotating the board 90 degrees counter-clockwise (`slideUp`), applying the left logic, and then rotating it back 90 degrees clockwise (`slideDown`).

$$
\text{moveUp}(\text{board}) = \text{slideDown}(\text{shiftLeft}(\text{slideUp}(\text{board})))
$$

| Step | Transformation | Result | 
 | ----- | ----- | ----- | 
| 1 | `slideUp()` | Rotates the board so the **top column** becomes the **left row**. | 
| 2 | `shiftLeft()` | Slides and gridAfterPerformingAdditionForSameAdjTiless tiles towards this temporary left edge (i.e., upwards). | 
| 3 | `slideDown()` | Rotates the board back to its original vertical orientation. | 

#### **Move Down**

Movement down is achieved by rotating the board 90 degrees clockwise (`slideDown`), applying the left logic, and then rotating it back 90 degrees counter-clockwise (`slideUp`).

$$
\text{moveDown}(\text{board}) = \text{slideUp}(\text{shiftLeft}(\text{slideDown}(\text{board})))
$$

| Step | Transformation | Result | 
 | ----- | ----- | ----- | 
| 1 | `slideDown()` | Rotates the board so the **bottom column** becomes the **left row**. | 
| 2 | `shiftLeft()` | Slides and gridAfterPerformingAdditionForSameAdjTiless tiles towards this temporary left edge (i.e., downwards). | 
| 3 | `slideUp()` | Rotates the board back to its original vertical orientation. |


 **last but not least the two game completion logic**

these two functions are responsible to end the game , one is when 2048 score found one when there is no move left
 ```ts
 export const checkIsGameOverWithNoMovesLeft = (grid: number[][]) => {
  // checking if the game have no moves left isSameGrid() is the function which checks if the grid is same with the above if yes it means no move can be possible
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

//here checking only if 2048 is found in the whole grid or not
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
 ```






