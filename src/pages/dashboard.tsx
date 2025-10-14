import { Grid3x3, RotateCcw, Users } from 'lucide-react';
import React, { useState } from 'react'
import NumberBox from '../components/numberBox';

export const Dashboard = () => {
  const [score, setScore] = useState(276);
  const [bestScore, setBestScore] = useState(276);
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]);
  const checkIfSpaceLeft=(grid:number[][]):boolean=>{
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(grid[i][j]===0){
          return true;
        }
      }
    }
    return false;
  }
  const getRandom=():number[]=>{
    let randRow=Math.floor(Math.random()*4);
    let randCol=Math.floor(Math.random()*4);
    return [randRow,randCol];
  }
  const getRandomEntryPosition=(grid:number[][]):number[][]=>{
    if(!checkIfSpaceLeft(grid)){
      return grid;
    }
    let [row,col]=getRandom();
    while(grid[row][col]!==0){
      [row,col]=getRandom();
    }
    grid[row][col]=2;
    return grid;
  }
  const gridAfterPerformingAdditionForSameAdjTiles=(grid:number[][]):number[][]=>{
    for(let i=0;i<4;i++){
      for(let j=0;j<3;j++){
        if(grid[i][j]!==0 && grid[i][j]==grid[i][j+1]){
          grid[i][j]=grid[i][j]*2;
          grid[i][j+1]=0;
        }
      }
    }
    return grid;
  }
  const slideLeft = (grid: number[][]): number[][] => {
    let newGrid:number[][]=Array.from({length:4},()=>Array(4).fill(0));
    for(let i=0;i<4;i++){
      let trackEmptyColIdx=0;
      for(let j=0;j<4;j++){
        if(grid[i][j]!==0){
          newGrid[i][trackEmptyColIdx]=grid[i][j];
          trackEmptyColIdx++;
        }
      }
    }
    return newGrid; 
  } 
  const slideRight = (grid: number[][]): number[][] => {
    let newGrid:number[][]=Array.from({length:4},()=>Array(4).fill(0));
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        newGrid[i][j]=grid[i][3-i];
      }
    }
    return newGrid;
  }
  const slideUp=(grid:number[][]):number[][] =>{
     let newGrid:number[][]=Array.from({length:4},()=>Array(4).fill(0));
     for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        newGrid[i][j]=grid[j][3-i];
        }
      }
     return newGrid;
  }
  const slideDown=(grid:number[][]):number[][]=>{
     let newGrid:number[][]=Array.from({length:4},()=>Array(4).fill(0));
     for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        newGrid[i][j]=grid[3-j][i];
        }
      }
     return newGrid;
  }
  const shiftLeft = (grid: number[][]): number[][] => {
    let gridAfterShiftingAllLeft = slideLeft(grid);
    let gridiAfterPerformingAddition = gridAfterPerformingAdditionForSameAdjTiles(gridAfterShiftingAllLeft);
    return slideLeft(gridiAfterPerformingAddition);
  }
  const shiftRight = (grid: number[][]): number[][] => {
    let gridAfterShiftingAllRight = slideRight(grid);
    let gridAfterPerformingRightSlide = shiftLeft(gridAfterShiftingAllRight);
    return slideRight(gridAfterPerformingRightSlide);
  }
  const shiftUp = (grid: number[][]): number[][] => {
     let gridAfterShiftingAllUp = slideUp(grid);
    let gridAfterPerformingUpSlide = shiftLeft(gridAfterShiftingAllUp);
    return slideUp(gridAfterPerformingUpSlide);
  }
  const shiftDown = (grid: number[][]): number[][] => {
     let gridAfterShiftingAllRight = slideDown(grid);
    let gridAfterPerformingDownSlide = shiftLeft(gridAfterShiftingAllRight);
    return slideDown(gridAfterPerformingDownSlide);
  }
  const isSameGrid=(oldGrid:number[][],updatedGridAfterMove:number[][])=>{
    for(let i=0;i<4;i++){
      for( let j=0;j<4;j++){
        if(oldGrid[i][j]!==updatedGridAfterMove[i][j]){
          return false;
        }
      }
    }
    return true;
  }
  const checkIsGameOverWithNoMovesLeft=()=>{
    if(isSameGrid(grid,shiftLeft(grid)) && isSameGrid(grid,shiftRight(grid)) && isSameGrid(grid,shiftUp(grid)) && isSameGrid(grid,shiftDown(grid))){
      return true;
    }
    return false;
  }
  const isFinalValueFound=():boolean=>{
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(grid[i][j]==2048){
          return true;
        }
      }
    }
    return false;
  }
  return (
    <div className="min-h-screen bg-[#faf8ef] flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="text-[#776e65] hover:text-[#8f7a66]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-7xl font-bold text-[#776e65]">2048</h1>
          </div>
          
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
        </div>

        <div className="flex justify-end mb-6">
          <button className="bg-[#8f7a66] hover:bg-[#9f8a76] text-white font-bold py-2 px-6 rounded">
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div className="bg-[#bbada0] rounded-lg p-4 mb-6">
           <div className="grid grid-cols-4 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <NumberBox  rowIndex={rowIndex} col={col} colIndex={colIndex} />
            ))
          )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-[#eee4da] hover:bg-[#e8dfd0] p-4 rounded flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-[#776e65]" />
          </button>
          <button className="bg-[#eee4da] hover:bg-[#e8dfd0] p-4 rounded flex items-center justify-center">
            <Users className="w-6 h-6 text-[#776e65]" />
          </button>
          <button className="bg-[#eee4da] hover:bg-[#e8dfd0] p-4 rounded flex items-center justify-center">
            <Grid3x3 className="w-6 h-6 text-[#776e65]" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-[#776e65] text-sm">
          play2048.co © 2014—2025 Gabriele Cirulli. All rights reserved.
        </div>
      </div>
    </div>
    )
}
