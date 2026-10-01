import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { Heart, Timer, Sparkles, Play } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface SpawnItem {
  id: number;
  type: 'heart' | 'obstacle';
  x: number; // percentage
  y: number; // percentage
  symbol: string;
  createdAt: number;
}

export const Level2_RootsConnect: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, deductLifePoints, unlockDedication } = useGame();

  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed'>('ready');
  const [timeLeft, setTimeLeft] = useState<number>(25);
  const [heartsCaught, setHeartsCaught] = useState<number>(0);
  const [happinessPoints, setHappinessPoints] = useState<number>(0);
  const [items, setItems] = useState<SpawnItem[]>([]);
  const [floatNotice, setFloatNotice] = useState<{ text: string; color: string } | null>(null);

  const TARGET_HEARTS = 10;
  const nextId = useRef(1);

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0 || heartsCaught >= TARGET_HEARTS) {
      finishGame();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft, heartsCaught]);

  // Spawner loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawner = setInterval(() => {
      setItems(prev => {
        // Keep max 4 items on screen
        const now = Date.now();
        const filtered = prev.filter(item => now - item.createdAt < 2200);

        if (filtered.length >= 3) return filtered;

        const isObstacle = Math.random() < 0.28;
        const newItem: SpawnItem = {
          id: nextId.current++,
          type: isObstacle ? 'obstacle' : 'heart',
          x: Math.floor(Math.random() * 75) + 10,
          y: Math.floor(Math.random() * 70) + 12,
          symbol: isObstacle ? (Math.random() > 0.5 ? '🌑' : '🪨') : (Math.random() > 0.5 ? '❤️' : '💖'),
          createdAt: now
        };

        return [...filtered, newItem];
      });
    }, 700);

    return () => clearInterval(spawner);
  }, [gameState]);

  const startGame = () => {
    soundEngine.playSparkle();
    setGameState('playing');
    setTimeLeft(25);
    setHeartsCaught(0);
    setHappinessPoints(0);
    setItems([]);
  };

  const finishGame = () => {
    soundEngine.playSuccess();
    unlockDedication('dedication_mother');
    setGameState('completed');
  };

  const handleItemClick = (item: SpawnItem, e: React.MouseEvent) => {
    e.stopPropagation();
    // Remove clicked item
    setItems(prev => prev.filter(i => i.id !== item.id));

    if (item.type === 'heart') {
      soundEngine.playSparkle();
      const pointsGained = 20;
      setHeartsCaught(prev => prev + 1);
      setHappinessPoints(prev => prev + pointsGained);
      addLifePoints(pointsGained, '❤️ +20 Puntos de Felicidad');

      setFloatNotice({ text: '+20 Felicidad ❤️', color: 'text-rose-400' });
      setTimeout(() => setFloatNotice(null), 900);
    } else {
      soundEngine.playObstacle();
      const pointsLost = 10;
      setHappinessPoints(prev => Math.max(0, prev - pointsLost));
      deductLifePoints(pointsLost, 'Obstáculo tocado');

      setFloatNotice({ text: '-10 Felicidad 🌑', color: 'text-amber-400' });
      setTimeout(() => setFloatNotice(null), 900);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-1">
        <Heart className="w-7 h-7 text-rose-400 mx-auto animate-pulse" />
        <h3 className="font-serif font-bold text-rose-200 text-lg sm:text-xl">
          Atrapa los Corazones
        </h3>
        <p className="text-xs text-slate-300">
          Toca rápidamente los corazones de amor que florecen de las raíces ancestrales. ¡Evita las sombras!
        </p>
      </div>

      {/* Scoreboard / Stats Bar */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-emerald-800/40 flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Timer className="w-3.5 h-3.5 text-amber-300" />
            <span>Tiempo</span>
          </div>
          <div className="font-serif font-bold text-base text-amber-200">{timeLeft}s</div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-emerald-800/40 flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20" />
            <span>Atrapados</span>
          </div>
          <div className="font-serif font-bold text-base text-rose-200">
            {heartsCaught} / {TARGET_HEARTS}
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-emerald-800/40 flex flex-col items-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Felicidad</span>
          </div>
          <div className="font-serif font-bold text-base text-emerald-300">+{happinessPoints}</div>
        </div>
      </div>

      {/* Floating Notice / Feedback */}
      <div className="h-5 flex items-center justify-center">
        {floatNotice && (
          <span className={`text-xs font-bold font-serif animate-bounce ${floatNotice.color}`}>
            {floatNotice.text}
          </span>
        )}
      </div>

      {/* Main Interactive Stage */}
      <div className="relative w-full h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 border border-emerald-700/50 overflow-hidden shadow-inner flex items-center justify-center">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.12),transparent_70%)] pointer-events-none" />

        {gameState === 'ready' && (
          <div className="text-center space-y-3 z-10 px-4">
            <div className="text-4xl animate-bounce">💖</div>
            <p className="text-xs text-slate-300 font-serif max-w-xs mx-auto">
              Atrapa {TARGET_HEARTS} corazones antes de que termine el tiempo para nutrir las raíces del amor.
            </p>
            <button
              onClick={startGame}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all flex items-center justify-center gap-2 mx-auto active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>¡Comenzar Desafío!</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <>
            {items.map(item => (
              <button
                key={item.id}
                onClick={e => handleItemClick(item, e)}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute p-2 rounded-full cursor-pointer select-none transition-transform hover:scale-125 active:scale-90 animate-fadeIn ${
                  item.type === 'heart'
                    ? 'text-4xl filter drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]'
                    : 'text-3xl filter drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]'
                }`}
              >
                {item.symbol}
              </button>
            ))}
          </>
        )}

        {gameState === 'completed' && (
          <div className="text-center space-y-3 z-10 p-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-400 mx-auto flex items-center justify-center text-3xl">
              ❤️
            </div>
            <h4 className="font-serif font-bold text-rose-200 text-lg">
              ¡Corazones Atrapados con Éxito!
            </h4>
            <p className="text-xs text-slate-300 font-serif max-w-xs mx-auto">
              Obtuviste <strong className="text-rose-300">+{happinessPoints} Puntos de Felicidad</strong> y conectaste las raíces del amor maternal.
            </p>
            <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
              💌 Dedicatoria Desbloqueada: [Amor de Madre]
            </div>
          </div>
        )}
      </div>

      {/* Outro / Next Button */}
      {gameState === 'completed' && (
        <button
          onClick={onComplete}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-98 animate-fadeIn"
        >
          Continuar al Siguiente Nivel →
        </button>
      )}
    </div>
  );
};
