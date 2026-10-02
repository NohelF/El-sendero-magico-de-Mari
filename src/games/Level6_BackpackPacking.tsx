import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { getAssetUrl } from '../utils/assets';
import { Sparkles, CheckCircle2, RotateCcw, Compass } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

const SOLUTION = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 1, 4, 3],
  [4, 3, 2, 1]
];

// Initial board (0 means empty)
const INITIAL_BOARD = [
  [1, 0, 3, 0],
  [0, 4, 0, 2],
  [2, 0, 4, 0],
  [0, 3, 0, 1]
];

const SYMBOLS: Record<number, { icon: string; name: string }> = {
  1: { icon: '🌱', name: '1' },
  2: { icon: '💧', name: '2' },
  3: { icon: '🔥', name: '3' },
  4: { icon: '✨', name: '4' }
};

export const Level6_BackpackPacking: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication } = useGame();

  const [board, setBoard] = useState<number[][]>(() =>
    INITIAL_BOARD.map(row => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  // Check validity for a given move
  const checkValidity = (grid: number[][], r: number, c: number, val: number): boolean => {
    // Check row
    for (let col = 0; col < 4; col++) {
      if (col !== c && grid[r][col] === val) return false;
    }
    // Check col
    for (let row = 0; row < 4; row++) {
      if (row !== r && grid[row][c] === val) return false;
    }
    // Check 2x2 box
    const startRow = Math.floor(r / 2) * 2;
    const startCol = Math.floor(c / 2) * 2;
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 2; col++) {
        const curR = startRow + row;
        const curC = startCol + col;
        if ((curR !== r || curC !== c) && grid[curR][curC] === val) return false;
      }
    }
    return true;
  };

  const handleSelectNumber = (num: number) => {
    if (!selectedCell || isDone) return;
    const { r, c } = selectedCell;

    if (INITIAL_BOARD[r][c] !== 0) return; // Cannot edit initial clues

    // Validate before placing
    const isValid = checkValidity(board, r, c, num);
    if (!isValid) {
      soundEngine.playObstacle();
      setErrorMsg(`El elemento ${SYMBOLS[num].icon} ya existe en esa fila, columna o bloque 2×2.`);
      setTimeout(() => setErrorMsg(null), 2500);
      return;
    }

    soundEngine.playSparkle();
    setErrorMsg(null);

    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = num;
    setBoard(newBoard);

    // Check if fully solved
    let isComplete = true;
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (newBoard[row][col] !== SOLUTION[row][col]) {
          isComplete = false;
        }
      }
    }

    if (isComplete) {
      soundEngine.playSuccess();
      unlockDedication('dedication_mentors');
      addLifePoints(150, '🔎 +150 Exploración: ¡Sudoku Mágico Resuelto!');
      setIsDone(true);
    }
  };

  const handleClearCell = () => {
    if (!selectedCell || isDone) return;
    const { r, c } = selectedCell;
    if (INITIAL_BOARD[r][c] !== 0) return;

    soundEngine.playClick();
    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = 0;
    setBoard(newBoard);
  };

  const handleReset = () => {
    soundEngine.playClick();
    setBoard(INITIAL_BOARD.map(row => [...row]));
    setSelectedCell(null);
    setErrorMsg(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-1">
        <Sparkles className="w-6 h-6 text-amber-300 mx-auto animate-pulse" />
        <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
          🧩 Sudoku Mágico (4 × 4)
        </h3>
        <p className="text-xs text-slate-300">
          Completa cada fila, columna y bloque 2×2 con los 4 elementos sin repetirlos: 🌱 (1), 💧 (2), 🔥 (3), ✨ (4).
        </p>
      </div>

      {/* Error / Alert notice */}
      <div className="h-6 flex items-center justify-center">
        {errorMsg ? (
          <span className="text-xs font-serif text-rose-300 bg-rose-950/60 px-3 py-0.5 rounded-full border border-rose-500/50 animate-shake">
            ⚠️ {errorMsg}
          </span>
        ) : (
          <span className="text-xs font-serif text-slate-400 italic">
            Selecciona una casilla vacía y luego elige un símbolo abajo
          </span>
        )}
      </div>

      {/* 4x4 Sudoku Grid */}
      <div className="flex justify-center py-1">
        <div className="p-3 rounded-2xl bg-slate-950/90 border-2 border-emerald-700 shadow-xl grid grid-cols-4 gap-2">
          {board.map((row, r) =>
            row.map((val, c) => {
              const isInitial = INITIAL_BOARD[r][c] !== 0;
              const isSelected = selectedCell?.r === r && selectedCell?.c === c;

              // Border accents for 2x2 blocks
              const borderRight = c === 1 ? 'border-r-2 border-r-emerald-500' : '';
              const borderBottom = r === 1 ? 'border-b-2 border-b-emerald-500' : '';

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCell({ r, c });
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all ${borderRight} ${borderBottom} ${
                    isInitial
                      ? 'bg-slate-800/90 text-amber-200 border border-emerald-800/60 font-serif'
                      : isSelected
                      ? 'bg-amber-500/25 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105'
                      : val !== 0
                      ? 'bg-emerald-950/70 border border-teal-500/50 text-teal-200'
                      : 'bg-slate-900/60 border border-slate-700/60 hover:bg-slate-800/60'
                  }`}
                >
                  {val !== 0 ? (
                    <span title={`Elemento ${val}`}>{SYMBOLS[val]?.icon}</span>
                  ) : (
                    <span className="text-slate-600 text-sm">·</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Symbol Selection Palette */}
      {!isDone && (
        <div className="flex items-center justify-center gap-3 pt-2">
          {[1, 2, 3, 4].map(num => (
            <button
              key={num}
              onClick={() => handleSelectNumber(num)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-900/70 border border-emerald-700/60 text-white font-serif font-bold text-sm shadow transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span className="text-xl">{SYMBOLS[num].icon}</span>
              <span className="text-amber-200 font-mono text-xs">{num}</span>
            </button>
          ))}

          <button
            onClick={handleClearCell}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-serif active:scale-95"
            title="Borrar casilla seleccionada"
          >
            Borrar
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 text-xs active:scale-95"
            title="Reiniciar tablero"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-400 text-center space-y-3 animate-fadeIn">
          <div className="relative mx-auto w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-slate-950/80 flex items-center justify-center">
            <img
              src={getAssetUrl('assets/characters/mentoras.png')}
              alt="Mentoras"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              🛤️ Mentoras y Sabias del Camino
            </h4>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-teal-300 font-serif">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>+150 Puntos de Exploración 🔎</span>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria de Mentores Guardada
          </div>

          <p className="text-xs text-slate-300 italic font-serif">
            "El orden y el equilibrio florecen cuando cada elemento encuentra su lugar natural."
          </p>

          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-98"
          >
            Continuar al Siguiente Nivel →
          </button>
        </div>
      )}
    </div>
  );
};
