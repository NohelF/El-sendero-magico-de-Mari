import React, { useState, useEffect } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { getAssetUrl } from '../utils/assets';
import { Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface CardItem {
  id: number;
  symbol: string;
  name: string;
  pairId: number;
}

const SYMBOLS = [
  { symbol: '⭐', name: 'Estrella Mágica' },
  { symbol: '🌙', name: 'Luna Serena' },
  { symbol: '🌸', name: 'Flor Radiante' },
  { symbol: '❤️', name: 'Corazón Cálido' },
  { symbol: '🐈', name: 'Gatito Guardián' },
  { symbol: '🔮', name: 'Cristal de Luz' }
];

export const Level3_FamilyBranches: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication } = useGame();

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  // Initialize deck on mount
  useEffect(() => {
    const deck: CardItem[] = [];
    SYMBOLS.forEach((item, index) => {
      deck.push({ id: index * 2, symbol: item.symbol, name: item.name, pairId: index });
      deck.push({ id: index * 2 + 1, symbol: item.symbol, name: item.name, pairId: index });
    });

    // Shuffle deck
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (flipped.includes(index) || matched.includes(index)) return;

    soundEngine.playClick();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      setIsLocked(true);

      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.pairId === secondCard.pairId) {
        soundEngine.playSparkle();
        setMatched(prev => {
          const updated = [...prev, newFlipped[0], newFlipped[1]];
          if (updated.length === cards.length) {
            soundEngine.playSuccess();
            unlockDedication('dedication_siblings');
            addLifePoints(150, '❤️ +150 Felicidad: ¡Memoria Mágica Completada!');
            setIsDone(true);
          }
          return updated;
        });
        setFlipped([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-1">
        <Sparkles className="w-6 h-6 text-amber-300 mx-auto animate-pulse" />
        <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
          Memoria Mágica
        </h3>
        <p className="text-xs text-slate-300">
          Encuentra las 6 parejas de símbolos mágicos del bosque para entrelazar las ramas familiares.
        </p>

        <div className="flex items-center justify-center gap-4 pt-1 font-mono text-xs">
          <span className="text-emerald-300">Parejas: {matched.length / 2} / 6</span>
          <span className="text-slate-400">Intentos: {moves}</span>
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 py-2">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const isMatched = matched.includes(index);

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              disabled={isFlipped || isLocked}
              className={`h-20 sm:h-24 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center select-none cursor-pointer ${
                isMatched
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)] scale-95'
                  : isFlipped
                  ? 'bg-emerald-800/80 border-emerald-400 text-white shadow-lg'
                  : 'bg-slate-800/90 hover:bg-slate-750 border-emerald-800/60 hover:border-emerald-500 active:scale-95'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center animate-fadeIn">
                  <span className="text-2xl sm:text-3xl">{card.symbol}</span>
                  <span className="text-[9px] font-serif text-amber-200 mt-1 hidden sm:block">
                    {card.name}
                  </span>
                </div>
              ) : (
                <span className="text-xl sm:text-2xl opacity-60">✨</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-emerald-400 text-center space-y-3 animate-fadeIn">
          <div className="relative mx-auto w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-400/80 shadow-[0_0_20px_rgba(16,185,129,0.4)] bg-slate-950/80 flex items-center justify-center">
            <img
              src={getAssetUrl('assets/characters/familia.png')}
              alt="Familia"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              🌳 Familia — ¡Lazos y Raíces Compartidas!
            </h4>
          </div>

          <div className="flex items-center justify-center gap-4 py-1">
            <div className="flex items-center gap-1 text-xs text-rose-300 font-serif">
              <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400" />
              <span>+75 Felicidad</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-teal-300 font-serif">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>+75 Exploración</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria Familiar Guardada
          </div>

          <p className="text-xs text-slate-300 italic font-serif">
            "Crecer juntos significa compartir raíces y saber que el mismo viento nos hace cantar a todos."
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
