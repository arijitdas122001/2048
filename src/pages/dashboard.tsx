import React, { useEffect, useState } from 'react'
import NumberBox from '../components/numberBox';
import { checkIsGameOverWithNoMovesLeft, getRandomEntryPosition, isFinalValueFound, shiftDown, shiftLeft, shiftRight, shiftUp } from '../logic/logicalFunctions';
import { toast, ToastContainer } from 'react-toastify';

export const Dashboard = () => {
  const getEmptyGrid=()=>{
    return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]
    ]
  }
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [grid, setGrid] = useState<number[][]>(getRandomEntryPosition(getEmptyGrid(),true));
  const checkGameEndingStatus=(currGrid:number[][])=>{
    if(isFinalValueFound(currGrid)){
      console.log("Game over, win");
      toast.success("Congratulations! You've reached 2048!")
    }
    else if(checkIsGameOverWithNoMovesLeft(currGrid)){
      // console.log("Game over, no moves left");
      toast.error("Game Over! No moves left.")
    }
  }
  const startNewGame=():any=>{
    setGrid(getRandomEntryPosition(getEmptyGrid(),true));
  }
  const performUpAction=()=>{
    // console.log("perfoming up action");
    const gridAfterUpOp=shiftUp(grid);
    setGrid(getRandomEntryPosition(gridAfterUpOp,false));
    checkGameEndingStatus(gridAfterUpOp);
  }
  const performDownAction=()=>{
    const gridAfterDownOp=shiftDown(grid);
    setGrid(getRandomEntryPosition(gridAfterDownOp,false));
    checkGameEndingStatus(gridAfterDownOp);
  }
  const performRightAction=()=>{
    const gridAfterRightOp=shiftRight(grid);
    setGrid(getRandomEntryPosition(gridAfterRightOp,false));
    checkGameEndingStatus(gridAfterRightOp);
  }
  const performLeftAction=()=>{
    const gridAfterLeftOp=shiftLeft(grid);
    setGrid(getRandomEntryPosition(gridAfterLeftOp,false));
    checkGameEndingStatus(gridAfterLeftOp);
  } 
 const calculateScore=()=>{
      let currScore=0;
      for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
          if(grid[i][j]!==2){
            currScore+=grid[i][j];
          }
        }
      } 
      setScore(currScore);
      setBestScore(Math.max(bestScore,currScore))
    }
  const onKeyEvent=(e:KeyboardEvent)=>{
    switch(e.key){
      case 'ArrowUp':
        performUpAction();
        calculateScore();
        break;
      case 'ArrowDown':
        performDownAction();
        calculateScore();
        break;
      case 'ArrowLeft':
        performLeftAction();
        calculateScore();
        break;
      case 'ArrowRight':
        performRightAction();
        calculateScore();
        break;

        default:
          break;
    }
  }
  useEffect(()=>{
    window.addEventListener('keydown',onKeyEvent);
    return ()=>{
      window.removeEventListener('keydown',onKeyEvent);
    }
  })
  return (
    <div className="min-h-screen bg-[#faf8ef] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-10 mb-6">
          <div className="flex gap-3">
            <div className="bg-[#bbada0] rounded px-6 py-2 text-center min-w-[80px]">
              <div className="text-[#eee4da] text-xs font-bold uppercase">Score</div>
              <div className="text-white text-2xl font-bold">{score}</div>
            </div>
            <div className="bg-[#bbada0] rounded px-6 py-2 text-center min-w-[80px]">
              <div className="text-[#eee4da] text-xs font-bold uppercase">Best</div>
              <div className="text-white text-2xl font-bold">{bestScore}</div>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
            <div className="bg-[#bbada0] rounded px-6 py-2 text-center min-w-[100px]">
              <div className="text-[#eee4da] text-xs font-bold uppercase">row</div>
              <input className="text-white text-2xl font-bold w-10 flex justify-center text-center outline-none border-none"/>
            </div>
            <div className="bg-[#bbada0] rounded px-6 py-2 text-center min-w-[100px]">
              <div className="text-[#eee4da] text-xs font-bold uppercase">column</div>
              <input className="text-white text-2xl font-bold w-10 lex justify-center text-center outline-none border-none" />
            </div>
              <button>Set Grid Size</button>
          </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <button className="bg-[#8f7a66] hover:bg-[#9f8a76] text-white font-bold py-2 px-6 rounded hover:cursor-pointer" onClick={startNewGame}>
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div className="bg-[#bbada0] rounded-lg p-4 mb-6">
           <div className="grid grid-cols-4 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`}>
              <NumberBox  rowIndex={rowIndex} col={col} colIndex={colIndex} />
              </div>
            ))
          )}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
    )
}
