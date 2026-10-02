import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { getAssetUrl } from '../utils/assets';
import { Compass, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

// 0: Walkable path
// 1: Hedge / Tree wall
// 2: Shiny Star collectible
const MAZE_GRID = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 2, 1],
  [1, 1, 1, 0, 1, 0, 1],
  [1, 2, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 2, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1]
];

const START_POS = { x: 1, y: 1 };
const EXIT_POS = { x: 5, y: 5 };

export const Level4_CatSanctuary: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication } = useGame();

  const [playerPos, setPlayerPos] = useState(START_POS);
  const [collectibles, setCollectibles] = useState<{ x: number; y: number }[]>([
    { x: 5, y: 1 },
    { x: 1, y: 3 },
    { x: 3, y: 5 }
  ]);
  const [starsCollected, setStarsCollected] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const movePlayer = useCallback((dx: number, dy: number) => {
    if (isDone) return;

    setPlayerPos(current => {
      const nextX = current.x + dx;
      const nextY = current.y + dy;

      // Check boundaries and walls
      if (
        nextY < 0 ||
        nextY >= MAZE_GRID.length ||
        nextX < 0 ||
        nextX >= MAZE_GRID[0].length ||
        MAZE_GRID[nextY][nextX] === 1
      ) {
        soundEngine.playClick();
        return current;
      }

      soundEngine.playClick();

      // Check for collectibles
      setCollectibles(prev => {
        const found = prev.find(c => c.x === nextX && c.y === nextY);
        if (found) {
          soundEngine.playSparkle();
          setStarsCollected(s => s + 1);
          addLifePoints(20, '🔎 +20 Exploración: ¡Destello encontrado!');
          return prev.filter(c => !(c.x === nextX && c.y === nextY));
        }
        return prev;
      });

      // Check for exit
      if (nextX === EXIT_POS.x && nextY === EXIT_POS.y) {
        soundEngine.playSuccess();
        unlockDedication('dedication_cats');
        addLifePoints(150, '🔎 +150 Exploración: ¡Laberinto Mágico Completado!');
        setIsDone(true);
      }

      return { x: nextX, y: nextY };
    });
  }, [isDone, addLifePoints, unlockDedication]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          movePlayer(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          movePlayer(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          movePlayer(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          movePlayer(1, 0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [movePlayer]);

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-1">
        <Compass className="w-6 h-6 text-emerald-300 mx-auto animate-spin-slow" />
        <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
          🌲 El Laberinto Mágico
        </h3>
        <p className="text-xs text-slate-300">
          Guía a Mari desde el inicio hasta el santuario de salida. Usa las flechas del teclado o los controles en pantalla.
        </p>

        <div className="flex items-center justify-center gap-3 pt-1 font-mono text-xs text-teal-300">
          <span>Destellos recogidos: {starsCollected} / 3</span>
        </div>
      </div>

      {/* Maze Visual Grid */}
      <div className="flex justify-center py-2">
        <div className="grid grid-cols-7 gap-1 p-2 rounded-2xl bg-slate-950/90 border border-emerald-800/60 shadow-inner">
          {MAZE_GRID.map((row, y) =>
            row.map((cell, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isExit = EXIT_POS.x === x && EXIT_POS.y === y;
              const isStart = START_POS.x === x && START_POS.y === y;
              const hasCollectible = collectibles.some(c => c.x === x && c.y === y);

              return (
                <div
                  key={`${x}-${y}`}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-base sm:text-lg select-none transition-all ${
                    cell === 1
                      ? 'bg-emerald-950/90 border border-emerald-900/80 text-emerald-600'
                      : isPlayer
                      ? 'bg-amber-500/30 border border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                      : isExit
                      ? 'bg-teal-500/30 border border-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.5)] animate-pulse'
                      : 'bg-slate-900/60 border border-slate-800/40'
                  }`}
                >
                  {cell === 1 ? (
                    <span className="opacity-40 text-xs">🌲</span>
                  ) : isPlayer ? (
                    <img
                      src={getAssetUrl('assets/characters/mari.png')}
                      alt="Mari"
                      className="w-8 h-8 object-contain drop-shadow"
                    />
                  ) : isExit ? (
                    <span className="animate-bounce">🌟</span>
                  ) : hasCollectible ? (
                    <span className="text-xs text-amber-300 animate-pulse">✨</span>
                  ) : isStart ? (
                    <span className="text-[10px] text-emerald-500 font-mono">INICIO</span>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* On-Screen Touch / Mouse D-pad Controls */}
      <div className="flex flex-col items-center gap-1.5 pt-1">
        <button
          onClick={() => movePlayer(0, -1)}
          className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-700 border border-emerald-700/60 flex items-center justify-center text-white active:scale-95 shadow"
          aria-label="Arriba"
        >
          <ArrowUp className="w-5 h-5 text-amber-300" />
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => movePlayer(-1, 0)}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-700 border border-emerald-700/60 flex items-center justify-center text-white active:scale-95 shadow"
            aria-label="Izquierda"
          >
            <ArrowLeft className="w-5 h-5 text-amber-300" />
          </button>
          <button
            onClick={() => movePlayer(0, 1)}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-700 border border-emerald-700/60 flex items-center justify-center text-white active:scale-95 shadow"
            aria-label="Abajo"
          >
            <ArrowDown className="w-5 h-5 text-amber-300" />
          </button>
          <button
            onClick={() => movePlayer(1, 0)}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-emerald-700 border border-emerald-700/60 flex items-center justify-center text-white active:scale-95 shadow"
            aria-label="Derecha"
          >
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        </div>
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-teal-400 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-400" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              ¡Has cruzado el Laberinto del Bosque!
            </h4>
          </div>

          <div className="text-xs text-teal-300 font-serif">
            +150 Puntos de Exploración 🔎
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria del Hogar Desbloqueada
          </div>

          <p className="text-xs text-slate-300 italic font-serif">
            "Encontrar el camino correcto no es cuestión de suerte, sino de tener la serenidad de dar cada paso."
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
