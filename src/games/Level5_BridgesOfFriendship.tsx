import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { getAssetUrl } from '../utils/assets';
import { Star, Compass, CheckCircle2 } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface StarSpot {
  id: number;
  x: number; // percentage
  y: number; // percentage
  label: string;
  size: 'sm' | 'md' | 'lg';
}

const STARS: StarSpot[] = [
  { id: 1, x: 20, y: 22, label: 'Sobre el Sauce Dorado', size: 'lg' },
  { id: 2, x: 75, y: 18, label: 'En el Cielo Nocturno', size: 'md' },
  { id: 3, x: 48, y: 35, label: 'Reflejo en el Arroyo', size: 'lg' },
  { id: 4, x: 15, y: 65, label: 'Orilla del Puente', size: 'sm' },
  { id: 5, x: 82, y: 55, label: 'Piedra de la Amistad', size: 'md' },
  { id: 6, x: 38, y: 75, label: 'Bajo el Tablón de Madera', size: 'sm' },
  { id: 7, x: 62, y: 70, label: 'Entre los Lirios Mágicos', size: 'lg' },
  { id: 8, x: 88, y: 82, label: 'Junto a la Cascada', size: 'md' }
];

const TARGET_STARS = 7;

export const Level5_BridgesOfFriendship: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication } = useGame();

  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  const [lastFound, setLastFound] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const handleStarClick = (star: StarSpot) => {
    if (collectedIds.includes(star.id) || isDone) return;

    soundEngine.playSparkle();
    const updated = [...collectedIds, star.id];
    setCollectedIds(updated);
    setLastFound(`¡Estrella descubierta en: ${star.label}!`);
    addLifePoints(20, '🔎 +20 Puntos de Exploración');

    if (updated.length >= TARGET_STARS) {
      soundEngine.playSuccess();
      unlockDedication('dedication_friends');
      addLifePoints(50, '🔎 +50 Exploración: ¡Puente Iluminado con Estrellas!');
      setIsDone(true);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-1">
        <Star className="w-6 h-6 text-amber-300 mx-auto animate-spin-slow" />
        <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
          ⭐ Recolecta Estrellas de Amistad
        </h3>
        <p className="text-xs text-slate-300">
          Encuentra y toca al menos {TARGET_STARS} estrellas luminosas escondidas a lo largo del valle y los puentes.
        </p>

        <div className="flex items-center justify-center gap-3 pt-1 font-mono text-xs text-amber-300">
          <span>Estrellas recolectadas: {collectedIds.length} / {TARGET_STARS}</span>
        </div>
      </div>

      {/* Floating Notice */}
      <div className="h-5 flex items-center justify-center">
        {lastFound && (
          <span className="text-xs font-serif text-amber-200 italic animate-fadeIn">
            {lastFound}
          </span>
        )}
      </div>

      {/* Scenery Stage */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-indigo-950 via-slate-900 to-emerald-950 border border-emerald-700/50 overflow-hidden shadow-inner select-none">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />

        {/* Scenic decorations */}
        <div className="absolute top-4 left-6 text-4xl opacity-30 pointer-events-none">🌲</div>
        <div className="absolute top-8 right-8 text-5xl opacity-25 pointer-events-none">🌙</div>
        <div className="absolute top-16 right-20 text-3xl opacity-30 pointer-events-none">🌲</div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-5xl opacity-35 pointer-events-none">🌉</div>
        <div className="absolute bottom-2 left-10 text-3xl opacity-30 pointer-events-none">🌸</div>
        <div className="absolute bottom-3 right-12 text-3xl opacity-30 pointer-events-none">🌾</div>

        {/* Stars */}
        {STARS.map(star => {
          const collected = collectedIds.includes(star.id);

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              disabled={collected}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={star.label}
              className={`absolute p-2.5 rounded-full cursor-pointer transition-all duration-500 ${
                collected
                  ? 'opacity-0 scale-150 pointer-events-none'
                  : 'hover:scale-130 active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-md animate-ping" />
                <Star
                  className={`text-amber-300 fill-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] ${
                    star.size === 'lg' ? 'w-8 h-8' : star.size === 'md' ? 'w-6 h-6' : 'w-5 h-5'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-amber-400 text-center space-y-3 animate-fadeIn">
          <div className="relative mx-auto w-32 h-24 sm:w-40 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.4)] bg-slate-950/80 flex items-center justify-center">
            <img
              src={getAssetUrl('assets/characters/amigos.png')}
              alt="Amigos"
              className="w-full h-full object-contain drop-shadow"
            />
          </div>

          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              🌉 Puentes de Amistad — ¡El Valle resplandece!
            </h4>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-teal-300 font-serif">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>+150 Puntos de Exploración 🔎</span>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria de Amistades Desbloqueada
          </div>

          <p className="text-xs text-slate-300 italic font-serif">
            "No todos los puentes duran para siempre, pero la luz de quienes los cruzaron contigo nunca se apaga."
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
