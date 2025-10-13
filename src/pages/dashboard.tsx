import { Grid3x3, RotateCcw, Users } from 'lucide-react';
import React, { useState } from 'react'

export const Dashboard = () => {
  const [score, setScore] = useState(276);
  const [bestScore, setBestScore] = useState(276);
  const [grid, setGrid] = useState([
    [2, 0, 2, 0],
    [8, 2, 4, 4],
    [16, 8, 32, 8],
    [2, 4, 16, 4]
  ]);

  const getTileColor = (value:number) => {
    const colors:{[key:number]:string} = {
      0: 'bg-[#cdc1b4]',
      2: 'bg-[#eee4da] text-[#776e65]',
      4: 'bg-[#ede0c8] text-[#776e65]',
      8: 'bg-[#f2b179] text-white',
      16: 'bg-[#f59563] text-white',
      32: 'bg-[#f67c5f] text-white',
      64: 'bg-[#f65e3b] text-white',
      128: 'bg-[#edcf72] text-white',
      256: 'bg-[#edcc61] text-white',
      512: 'bg-[#edc850] text-white',
      1024: 'bg-[#edc53f] text-white',
      2048: 'bg-[#edc22e] text-white'
    };
    return colors[value] || 'bg-[#cdc1b4]';
  };

  const getTileSize = (value:number) => {
    if (value >= 1024) return 'text-3xl';
    if (value >= 128) return 'text-4xl';
    return 'text-5xl';
  };

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

        {/* New Game Button */}
        <div className="flex justify-end mb-6">
          <button className="bg-[#8f7a66] hover:bg-[#9f8a76] text-white font-bold py-2 px-6 rounded">
            New Game
          </button>
        </div>

        {/* Game Grid */}
        <div className="bg-[#bbada0] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${getTileColor(cell)} rounded aspect-square flex items-center justify-center font-bold transition-all duration-100 ${getTileSize(cell)}`}
                >
                  {cell !== 0 && cell}
                </div>
              ))
            ))}
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
