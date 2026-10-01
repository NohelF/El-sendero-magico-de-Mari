import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Pause, Flame } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

const GRID_SIZE = 10;
const TARGET_CANDLES = 33;

interface Position {
  x: number;
  y: number;
}

export const Level10_MiradorReveal: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints } = useGame();

  const [mariPos, setMariPos] = useState<Position>({ x: 4, y: 4 });
  const [trail, setTrail] = useState<Position[]>([
    { x: 4, y: 5 },
    { x: 4, y: 6 }
  ]);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('UP');
  const [candles, setCandles] = useState<Position[]>([
    { x: 2, y: 2 },
    { x: 7, y: 2 },
    { x: 5, y: 7 }
  ]);
  const [candlesCollected, setCandlesCollected] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  // Spawn new candle at an empty cell
  const spawnCandles = (currentCandles: Position[], player: Position): Position[] => {
    if (currentCandles.length >= 3) return currentCandles;

    const available: Position[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (
          (player.x !== x || player.y !== y) &&
          !currentCandles.some(c => c.x === x && c.y === y)
        ) {
          available.push({ x, y });
        }
      }
    }

    if (available.length === 0) return currentCandles;
    const randomPick = available[Math.floor(Math.random() * available.length)];
    return [...currentCandles, randomPick];
  };

  const handleMove = useCallback(() => {
    setMariPos(prevHead => {
      let nextX = prevHead.x;
      let nextY = prevHead.y;

      switch (directionRef.current) {
        case 'UP':
          nextY = (prevHead.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          nextY = (prevHead.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          nextX = (prevHead.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          nextX = (prevHead.x + 1) % GRID_SIZE;
          break;
      }

      // Update following trail (Manchas and Negro follow Mari)
      setTrail(prevTrail => [prevHead, prevTrail[0]]);

      // Check candle collection
      setCandles(prevCandles => {
        const hitIndex = prevCandles.findIndex(c => c.x === nextX && c.y === nextY);

        if (hitIndex !== -1) {
          soundEngine.playSparkle();

          setCandlesCollected(currentCount => {
            const nextCount = currentCount + 1;

            if (nextCount >= TARGET_CANDLES) {
              soundEngine.playSuccess();
              setIsRunning(false);
              setIsDone(true);
              addLifePoints(330, '✨ +330 Puntos: ¡Has apagado 33 velas y encendido un nuevo año de vida!');
            }

            return nextCount;
          });

          const remaining = prevCandles.filter((_, idx) => idx !== hitIndex);
          return spawnCandles(remaining, { x: nextX, y: nextY });
        }

        return prevCandles;
      });

      return { x: nextX, y: nextY };
    });
  }, [addLifePoints]);

  // Game loop tick
  useEffect(() => {
    if (!isRunning || isDone) return;

    const interval = setInterval(handleMove, 280);
    return () => clearInterval(interval);
  }, [isRunning, isDone, handleMove]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isDone) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          if (directionRef.current !== 'DOWN') setDirection('UP');
          if (!isRunning) setIsRunning(true);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          if (directionRef.current !== 'UP') setDirection('DOWN');
          if (!isRunning) setIsRunning(true);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          if (!isRunning) setIsRunning(true);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
          if (!isRunning) setIsRunning(true);
          break;
        case ' ':
          e.preventDefault();
          setIsRunning(r => !r);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDone, isRunning]);

  const changeDirection = (dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (isDone) return;
    soundEngine.playClick();

    if (
      (dir === 'UP' && direction !== 'DOWN') ||
      (dir === 'DOWN' && direction !== 'UP') ||
      (dir === 'LEFT' && direction !== 'RIGHT') ||
      (dir === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(dir);
    }

    if (!isRunning) setIsRunning(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
          <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
            🕯️ Las 33 Velas de Mari
          </h3>
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>
        <p className="text-xs text-slate-300">
          Mari avanza guiada por Manchas y Negro. Recolecta las 33 velas de cumpleaños que iluminan la cumbre.
        </p>
      </div>

      {/* Counter and Progress */}
      <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-600/40 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-amber-300 flex items-center gap-1.5">
            <span>🕯️ Velas Apagadas:</span>
            <strong className="text-base text-amber-200">{candlesCollected} / {TARGET_CANDLES}</strong>
          </span>

          {!isDone && (
            <button
              onClick={() => setIsRunning(r => !r)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 active:scale-95"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pausa' : 'Iniciar'}</span>
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-300 transition-all duration-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
            style={{ width: `${(candlesCollected / TARGET_CANDLES) * 100}%` }}
          />
        </div>
      </div>

      {/* Grid Canvas (10x10) */}
      <div className="flex justify-center py-1">
        <div className="grid grid-cols-10 gap-0.5 sm:gap-1 p-2 rounded-2xl bg-slate-950/95 border-2 border-emerald-800 shadow-2xl select-none">
          {Array.from({ length: GRID_SIZE }).map((_, y) =>
            Array.from({ length: GRID_SIZE }).map((_, x) => {
              const isHead = mariPos.x === x && mariPos.y === y;
              const isManchas = trail[0]?.x === x && trail[0]?.y === y;
              const isNegro = trail[1]?.x === x && trail[1]?.y === y;
              const hasCandle = candles.some(c => c.x === x && c.y === y);

              return (
                <div
                  key={`${x}-${y}`}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base transition-all bg-slate-900/60 border border-slate-800/40"
                >
                  {isHead ? (
                    <img
                      src="/assets/characters/mari.png"
                      alt="Mari"
                      className="w-6 h-6 object-contain drop-shadow animate-pulse"
                    />
                  ) : isManchas ? (
                    <img
                      src="/assets/characters/manchas.png"
                      alt="Manchas"
                      className="w-5 h-5 object-contain"
                    />
                  ) : isNegro ? (
                    <img
                      src="/assets/characters/negro.png"
                      alt="Negro"
                      className="w-5 h-5 object-contain"
                    />
                  ) : hasCandle ? (
                    <span className="animate-bounce">🕯️</span>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* On-screen Directional Controls */}
      {!isDone && (
        <div className="flex flex-col items-center gap-1.5 pt-1">
          <button
            onClick={() => changeDirection('UP')}
            className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-700 border border-amber-600/50 flex items-center justify-center text-white active:scale-95 shadow"
            aria-label="Arriba"
          >
            <ArrowUp className="w-5 h-5 text-amber-300" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => changeDirection('LEFT')}
              className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-700 border border-amber-600/50 flex items-center justify-center text-white active:scale-95 shadow"
              aria-label="Izquierda"
            >
              <ArrowLeft className="w-5 h-5 text-amber-300" />
            </button>
            <button
              onClick={() => changeDirection('DOWN')}
              className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-700 border border-amber-600/50 flex items-center justify-center text-white active:scale-95 shadow"
              aria-label="Abajo"
            >
              <ArrowDown className="w-5 h-5 text-amber-300" />
            </button>
            <button
              onClick={() => changeDirection('RIGHT')}
              className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-amber-700 border border-amber-600/50 flex items-center justify-center text-white active:scale-95 shadow"
              aria-label="Derecha"
            >
              <ArrowRight className="w-5 h-5 text-amber-300" />
            </button>
          </div>
        </div>
      )}

      {/* Final Victory / 33 Candles Celebration */}
      {isDone && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border-2 border-amber-400 text-center space-y-4 animate-fadeIn">
          <div className="text-4xl animate-bounce">🎂✨🕯️</div>

          <h4 className="font-serif font-bold text-amber-200 text-xl">
            ¡33 de 33 Velas Completadas!
          </h4>

          <p className="font-serif text-amber-100 text-sm sm:text-base leading-relaxed italic p-3 rounded-xl bg-slate-950/80 border border-amber-500/50">
            ✨ "Has apagado 33 velas y encendido un nuevo año de vida." ✨
          </p>

          <p className="text-xs text-slate-300 font-serif">
            Has completado los 10 niveles del sendero. La Guardiana sonríe con amor al ver el mapa de tu vida iluminado.
          </p>

          <button
            onClick={onComplete}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-serif font-bold text-base shadow-[0_0_30px_rgba(251,191,36,0.6)] transition-all active:scale-98"
          >
            🌟 Ver Estadísticas y Rueda de los 33 🌟
          </button>
        </div>
      )}
    </div>
  );
};
