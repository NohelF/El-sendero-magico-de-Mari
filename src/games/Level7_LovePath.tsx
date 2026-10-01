import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { Heart, CheckCircle2, RotateCcw } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

// 3x3 = 9 pieces puzzle
const INITIAL_PIECES = [4, 0, 7, 1, 8, 2, 5, 3, 6];
const SOLVED_PIECES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export const Level7_LovePath: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication } = useGame();

  const [pieces, setPieces] = useState<number[]>(INITIAL_PIECES);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const handlePieceClick = (slotIndex: number) => {
    if (isDone) return;

    if (selectedSlot === null) {
      soundEngine.playClick();
      setSelectedSlot(slotIndex);
    } else if (selectedSlot === slotIndex) {
      // Deselect
      soundEngine.playClick();
      setSelectedSlot(null);
    } else {
      // Swap pieces
      soundEngine.playClick();
      const newPieces = [...pieces];
      const temp = newPieces[selectedSlot];
      newPieces[selectedSlot] = newPieces[slotIndex];
      newPieces[slotIndex] = temp;
      setPieces(newPieces);
      setSelectedSlot(null);

      // Check if solved
      const isSolved = newPieces.every((val, idx) => val === SOLVED_PIECES[idx]);
      if (isSolved) {
        soundEngine.playSparkle();
        soundEngine.playSuccess();
        unlockDedication('dedication_love');
        addLifePoints(150, '❤️ +150 Felicidad: ¡Rompecabezas de Amor Completado!');
        setIsDone(true);
      }
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setPieces(INITIAL_PIECES);
    setSelectedSlot(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-1">
        <Heart className="w-7 h-7 text-rose-400 mx-auto animate-pulse" />
        <h3 className="font-serif font-bold text-rose-200 text-lg sm:text-xl">
          🧩 Rompecabezas del Amor (Mari)
        </h3>
        <p className="text-xs text-slate-300">
          Toca una pieza y luego otra para intercambiarlas de lugar hasta recomponer el retrato de Mari.
        </p>
      </div>

      {/* Status banner */}
      <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/70 border border-emerald-800/40 text-xs font-serif">
        <span className="text-slate-300 italic">
          {isDone
            ? '✨ ¡Imagen unificada con amor!'
            : selectedSlot !== null
            ? 'Selecciona la segunda pieza para intercambiar'
            : 'Toca una pieza para seleccionarla'}
        </span>
        {!isDone && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-200"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        )}
      </div>

      {/* 3x3 Puzzle Board */}
      <div className="flex justify-center py-2">
        <div
          className={`w-64 h-64 sm:w-72 sm:h-72 grid grid-cols-3 gap-1 p-2 rounded-2xl bg-slate-950/90 border-2 transition-all ${
            isDone
              ? 'border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
              : 'border-emerald-700/60 shadow-xl'
          }`}
        >
          {pieces.map((pieceId, slotIndex) => {
            const isCorrect = pieceId === slotIndex;
            const isSelected = selectedSlot === slotIndex;

            // Calculate background position for 3x3 slice
            const col = pieceId % 3;
            const row = Math.floor(pieceId / 3);
            const posX = col * 50; // 0%, 50%, 100%
            const posY = row * 50; // 0%, 50%, 100%

            return (
              <button
                key={slotIndex}
                onClick={() => handlePieceClick(slotIndex)}
                disabled={isDone}
                style={{
                  backgroundImage: 'url(/assets/characters/mari.png)',
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${posX}% ${posY}%`,
                  backgroundColor: '#064e3b'
                }}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'ring-4 ring-amber-400 scale-105 z-10 shadow-lg'
                    : isCorrect && !isDone
                    ? 'border-2 border-emerald-400/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'border border-slate-700/80 hover:brightness-110 active:scale-95'
                }`}
              >
                {/* Visual feedback mark when correctly positioned */}
                {isCorrect && !isDone && (
                  <span className="absolute top-1 right-1 text-xs text-amber-300 drop-shadow">
                    ✨
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 border border-rose-400 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-rose-400" />
            <h4 className="font-serif font-bold text-rose-200 text-base">
              ¡Retrato Completo con Amor!
            </h4>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-rose-300 font-serif">
            <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400" />
            <span>+150 Puntos de Felicidad ❤️</span>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria de Pareja Desbloqueada
          </div>

          <p className="text-xs text-rose-100 italic font-serif">
            "A veces dos personas comienzan caminando por caminos distintos y, sin darse cuenta, terminan construyendo juntos el paisaje entero."
          </p>

          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all active:scale-98"
          >
            Continuar al Siguiente Nivel →
          </button>
        </div>
      )}
    </div>
  );
};
