import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { Sparkles, Heart, Compass, CheckCircle2, Search } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface GardenSpot {
  id: string;
  name: string;
  icon: string;
  hint: string;
  contains: 'manchas' | 'negro' | 'empty';
  emptyMessage: string;
}

export const Level1_GardenTracks: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints } = useGame();
  const [inspectedSpots, setInspectedSpots] = useState<string[]>([]);
  const [foundManchas, setFoundManchas] = useState(false);
  const [foundNegro, setFoundNegro] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<string>(
    'Explora los rincones del jardín para encontrar a Manchas y a Negro escondidos entre la magia.'
  );

  const spots: GardenSpot[] = [
    {
      id: 'spot-rosal',
      name: 'Rosal Dorado',
      icon: '🌹',
      hint: 'Pétalos suaves que brillan con el sol',
      contains: 'manchas',
      emptyMessage: 'Solo suaves pétalos perfumados...'
    },
    {
      id: 'spot-fuente',
      name: 'Fuente Cristalina',
      icon: '⛲',
      hint: 'Agua pura que susurra memorias',
      contains: 'empty',
      emptyMessage: 'El agua cristalina refleja el cielo, pero aquí no hay nadie.'
    },
    {
      id: 'spot-sauce',
      name: 'Bajo el Sauce Mágico',
      icon: '🌿',
      hint: 'Hojas largas que crean sombras secretas',
      contains: 'negro',
      emptyMessage: 'Las ramas bailan con el viento suave...'
    },
    {
      id: 'spot-banco',
      name: 'Banca de Piedra Antigua',
      icon: '🪑',
      hint: 'Un lugar sereno para descansar',
      contains: 'empty',
      emptyMessage: 'Un cojín de musgo tibio. Alguien estuvo aquí hace poco.'
    },
    {
      id: 'spot-jazmin',
      name: 'Arbusto de Jazmín',
      icon: '🌸',
      hint: 'Aroma dulce y hojas resplandecientes',
      contains: 'empty',
      emptyMessage: 'Unas mariposas doradas alzan el vuelo al acercarte.'
    },
    {
      id: 'spot-seto',
      name: 'Rincón de Tréboles',
      icon: '🍀',
      hint: 'Tréboles luminosos entre la hierba',
      contains: 'empty',
      emptyMessage: 'Muchos tréboles de la suerte, pero ningún gatito por aquí.'
    }
  ];

  const handleSpotClick = (spot: GardenSpot) => {
    if (inspectedSpots.includes(spot.id)) return;

    setInspectedSpots(prev => [...prev, spot.id]);

    if (spot.contains === 'manchas') {
      soundEngine.playSparkle();
      setFoundManchas(true);
      setCurrentFeedback('¡Encontraste a Manchas! 🐾 Blanco con manchas negras, acurrucado felizmente.');
      addLifePoints(75, '❤️ +75 Puntos de Felicidad: ¡Encontraste a Manchas!');
    } else if (spot.contains === 'negro') {
      soundEngine.playSparkle();
      setFoundNegro(true);
      setCurrentFeedback('¡Encontraste a Negro! 🐈‍⬛ Con su pelaje oscuro y ojos llenos de estrellas curiosas.');
      addLifePoints(75, '🔎 +75 Puntos de Exploración: ¡Encontraste a Negro!');
    } else {
      soundEngine.playClick();
      setCurrentFeedback(spot.emptyMessage);
    }
  };

  const allFound = foundManchas && foundNegro;

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-5">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl animate-bounce">🐈</span>
          <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
            Encuentra a Manchas y a Negro
          </h3>
          <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🐈‍⬛</span>
        </div>
        <p className="text-xs text-slate-300">
          Toca las zonas del jardín para descubrir a tus dos compañeros espirituales.
        </p>

        {/* Status badges */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-serif flex items-center gap-1.5 transition-all ${
              foundManchas
                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            {foundManchas ? <CheckCircle2 className="w-4 h-4 text-amber-300" /> : <Search className="w-3.5 h-3.5" />}
            <span>Manchas {foundManchas ? '✓ (Encontrado)' : '(Buscando...)'}</span>
          </div>

          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-serif flex items-center gap-1.5 transition-all ${
              foundNegro
                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-200 shadow-[0_0_12px_rgba(129,140,248,0.3)]'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            {foundNegro ? <CheckCircle2 className="w-4 h-4 text-indigo-300" /> : <Search className="w-3.5 h-3.5" />}
            <span>Negro {foundNegro ? '✓ (Encontrado)' : '(Buscando...)'}</span>
          </div>
        </div>
      </div>

      {/* Narrative Feedback Bar */}
      <div className="p-3 rounded-xl bg-slate-950/70 border border-emerald-800/40 text-xs text-emerald-200 font-serif italic text-center min-h-[44px] flex items-center justify-center">
        {currentFeedback}
      </div>

      {/* Garden Spots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {spots.map(spot => {
          const inspected = inspectedSpots.includes(spot.id);
          const hasManchas = spot.contains === 'manchas';
          const hasNegro = spot.contains === 'negro';

          return (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
              disabled={inspected}
              className={`h-28 rounded-2xl border p-2 text-center transition-all flex flex-col items-center justify-center gap-1 active:scale-95 ${
                inspected && hasManchas
                  ? 'bg-amber-500/25 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : inspected && hasNegro
                  ? 'bg-indigo-500/25 border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.4)]'
                  : inspected
                  ? 'bg-slate-800/50 border-slate-700/60 opacity-60'
                  : 'bg-slate-800/90 hover:bg-slate-750 border-emerald-800/60 hover:border-emerald-500 cursor-pointer'
              }`}
            >
              {inspected && hasManchas ? (
                <div className="flex flex-col items-center animate-fadeIn">
                  <img
                    src="/assets/characters/manchas.png"
                    alt="Manchas"
                    className="w-14 h-14 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-bounce"
                  />
                  <span className="text-[11px] font-bold text-amber-200 font-serif">¡Manchas!</span>
                </div>
              ) : inspected && hasNegro ? (
                <div className="flex flex-col items-center animate-fadeIn">
                  <img
                    src="/assets/characters/negro.png"
                    alt="Negro"
                    className="w-14 h-14 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] animate-bounce"
                  />
                  <span className="text-[11px] font-bold text-indigo-200 font-serif">¡Negro!</span>
                </div>
              ) : (
                <>
                  <span className="text-2xl">{spot.icon}</span>
                  <span className="font-serif font-bold text-xs text-slate-200">{spot.name}</span>
                  <span className="text-[9px] text-slate-400 leading-tight line-clamp-1">{spot.hint}</span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Success Box when both are found */}
      {allFound && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-amber-400 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              ¡Has reunido a tus dos guías espirituales!
            </h4>
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin-slow" />
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

          <p className="text-xs text-slate-300 italic font-serif">
            "Manchas y Negro ronronean a tus pies. Ahora el sendero se siente seguro y lleno de luz."
          </p>

          <button
            onClick={() => {
              soundEngine.playSuccess();
              onComplete();
            }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-98"
          >
            Continuar al Siguiente Nivel →
          </button>
        </div>
      )}
    </div>
  );
};
