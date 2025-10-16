import React, { useEffect, useState } from "react";
import NumberBox from "../components/numberBox";
import {
  checkIsGameOverWithNoMovesLeft,
  getRandomEntryPosition,
  isFinalValueFound,
  shiftDown,
  shiftLeft,
  shiftRight,
  shiftUp,
} from "../logic/logicalFunctions";
import { toast, ToastContainer } from "react-toastify";

export const Dashboard = () => {
  const [score, setScore] = useState(0);
  const [row, setRow] = useState<number>(4);
  const [col, setCol] = useState<number>(4);
  const getEmptyGrid = (currRow: number, currCol: number) => {
    // console.log(`row ${currRow} col ${currCol}`)
    return Array.from({ length: currRow }, () =>
      Array.from({ length: currCol }, () => 0)
    );
  };
  const [grid, setGrid] = useState<number[][]>(
    getRandomEntryPosition([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], true)
  );
  const checkGameEndingStatus = (currGrid: number[][]) => {
    if (isFinalValueFound(currGrid)) {
      // console.log("Game over, win");
      toast.success("Congratulations! You've reached 2048!");
      setGrid(getRandomEntryPosition(getEmptyGrid(row, col), true));
    } else if (checkIsGameOverWithNoMovesLeft(currGrid)) {  
      // console.log("Game over, no moves left");
      toast.error("Game Over! No moves left. Please start a new game.");
    }
  };
  const startNewGame = (): any => {
    setGrid(getRandomEntryPosition(getEmptyGrid(row, col), true));
  };
  const performUpAction = () => {
    // console.log("perfoming up action");
    const gridAfterUpOp = shiftUp(grid);
    setGrid(getRandomEntryPosition(gridAfterUpOp, false));
    checkGameEndingStatus(gridAfterUpOp);
  };
  const performDownAction = () => {
    const gridAfterDownOp = shiftDown(grid);
    setGrid(getRandomEntryPosition(gridAfterDownOp, false));
    checkGameEndingStatus(gridAfterDownOp);
  };
  const performRightAction = () => {
    const gridAfterRightOp = shiftRight(grid);
    setGrid(getRandomEntryPosition(gridAfterRightOp, false));
    checkGameEndingStatus(gridAfterRightOp);
  };
  const performLeftAction = () => {
    const gridAfterLeftOp = shiftLeft(grid);
    setGrid(getRandomEntryPosition(gridAfterLeftOp, false));
    checkGameEndingStatus(gridAfterLeftOp);
  };
  const calculateScore = () => {
    let currScore = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (grid[i][j] !== 2) {
          currScore += grid[i][j];
        }
      }
    }
    setScore(currScore);
  };
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
  const startGameWithNewSize = (row: number, col: number) => {
    // console.log(`row ${row} col ${col}`)
    let currRow = row;
    let currCol = col;
    if (currRow < 2 || currCol < 2) {
    toast.error("Grid size must be at least 2×2");
    return;
  }
  if (currRow > 10 || currCol > 10) {
    toast.error("Grid too large — max 10×10");
    return;
  }
    let newGrid = Array.from({ length: currRow }, () =>
      Array.from({ length: currCol }, () => 0)
    );
    setGrid(getRandomEntryPosition(newGrid, true));
    setScore(0);
    toast.info(`started new Game with ${row} rows and ${col} columns`);
  };
  useEffect(() => {
    window.addEventListener("keydown", onKeyEvent);
    return () => {
      window.removeEventListener("keydown", onKeyEvent);
    };
  });
  return (
    <div className="min-h-screen bg-[#F1F1F1] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-10 mb-6">
          <div className="flex gap-3">
            <div className="bg-[#B6AE9F] rounded px-6 py-2 text-center min-w-[80px]">
              <div className="text-[#eee4da] text-xs font-bold uppercase">
                Score
              </div>
              <div className="text-white text-2xl font-bold">{score}</div>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <div className="bg-[#B6AE9F] rounded px-6 py-2 text-center min-w-[100px]">
                <div className="text-[#eee4da] text-xs font-bold uppercase">
                  row
                </div>
                <input
                type="number"
                min="2"
                max="10"
                  className="no-spinner text-white text-2xl font-bold w-10 flex justify-center text-center outline-none border-none"
                  onChange={(e) => setRow(Number(e.target.value))}
                  placeholder={row.toString()}
                />
              </div>
              <div className="bg-[#B6AE9F] rounded px-6 py-2 text-center min-w-[100px]">
                <div className="text-[#eee4da] text-xs font-bold uppercase">
                  column
                </div>
                <input
                 type="number"
                min="2"
                max="10"
                  className="no-spinner text-white text-2xl font-bold w-10 flex justify-center text-center outline-none border-none"
                  onChange={(e) => setCol(Number(e.target.value))}
                  placeholder={col.toString()}
                />
              </div>
              <button
                className="h-15 w-32 border-0 rounded bg-[#F84464] cursor-pointer text-white"
                onClick={() => startGameWithNewSize(row, col)}
              >
                Set Grid Size
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button
            className="bg-[#8f7a66] hover:bg-[#9f8a76] text-white font-bold py-2 px-6 rounded hover:cursor-pointer"
            onClick={startNewGame}
          >
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div className="bg-[#1a1613] rounded-lg p-4 mb-6">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
            }}
          >
            {grid.map((row, rowIndex) =>
              row.map((col, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  <NumberBox
                    rowIndex={rowIndex}
                    row={row}
                    col={col}
                    colIndex={colIndex}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
