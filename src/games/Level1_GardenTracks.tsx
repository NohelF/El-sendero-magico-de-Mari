import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { getAssetUrl } from '../utils/assets';
import { Sparkles, Heart, Compass, CheckCircle2, Search } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface GardenSpot {
  id: string;
  name: string;
  category: 'árboles' | 'flores' | 'rocas' | 'arbustos' | 'sendero';
  icon: string;
  hint: string;
  x: number; // percentage in stage
  y: number; // percentage in stage
  contains: 'manchas' | 'negro' | 'empty';
  emptyMessage: string;
}

export const Level1_GardenTracks: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints } = useGame();
  const [inspectedSpots, setInspectedSpots] = useState<string[]>([]);
  const [foundManchas, setFoundManchas] = useState(false);
  const [foundNegro, setFoundNegro] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<string>(
    'Explora los árboles, flores, rocas, arbustos y el sendero para encontrar a Manchas y a Negro.'
  );

  const spots: GardenSpot[] = [
    {
      id: 'spot-arboles',
      name: 'Los Altos Árboles',
      category: 'árboles',
      icon: '🌲',
      hint: 'Ramas altas envueltas en brisa fresca',
      x: 18,
      y: 20,
      contains: 'empty',
      emptyMessage: 'Entre las ramas de los árboles solo se escucha el cantar del viento...'
    },
    {
      id: 'spot-arbustos',
      name: 'Los Arbustos Espesos',
      category: 'arbustos',
      icon: '🌿',
      hint: 'Hojas oscuras con sombras protectoras',
      x: 52,
      y: 28,
      contains: 'negro',
      emptyMessage: 'Un crujido suave de hojas...'
    },
    {
      id: 'spot-flores',
      name: 'Rincón de Flores Mágicas',
      category: 'flores',
      icon: '🌸',
      hint: 'Pétalos dorados y jazmines que brillan',
      x: 82,
      y: 35,
      contains: 'manchas',
      emptyMessage: 'Pétalos suaves y mariposas de luz...'
    },
    {
      id: 'spot-rocas',
      name: 'Las Rocas de Musgo',
      category: 'rocas',
      icon: '🪨',
      hint: 'Piedras ancestrales junto al riachuelo',
      x: 22,
      y: 72,
      contains: 'empty',
      emptyMessage: 'Piedras tibias cubiertas de musgo suave. Nadie por aquí.'
    },
    {
      id: 'spot-sendero',
      name: 'El Sendero Empedrado',
      category: 'sendero',
      icon: '🛤️',
      hint: 'El camino de tierra y hojas doradas',
      x: 75,
      y: 75,
      contains: 'empty',
      emptyMessage: 'El sendero continúa despejado hacia el bosque...'
    }
  ];

  const handleSpotClick = (spot: GardenSpot) => {
    if (inspectedSpots.includes(spot.id)) return;

    setInspectedSpots(prev => [...prev, spot.id]);

    if (spot.contains === 'manchas') {
      soundEngine.playSparkle();
      setFoundManchas(true);
      setCurrentFeedback('¡Encontraste a Manchas entre las flores! 🐾 Blanco con manchas negras, feliz de verte.');
      addLifePoints(75, '❤️ +75 Puntos de Felicidad: ¡Encontraste a Manchas!');
    } else if (spot.contains === 'negro') {
      soundEngine.playSparkle();
      setFoundNegro(true);
      setCurrentFeedback('¡Encontraste a Negro entre los arbustos! 🐈‍⬛ Espíritu guía con ojos de estrellas curiosas.');
      addLifePoints(75, '🔎 +75 Puntos de Exploración: ¡Encontraste a Negro!');
    } else {
      soundEngine.playClick();
      setCurrentFeedback(spot.emptyMessage);
    }
  };

  const allFound = foundManchas && foundNegro;

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-slate-900/85 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-700/40 text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl sm:text-3xl animate-bounce">🐈</span>
          <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
            Encuentra a Manchas y a Negro
          </h3>
          <span className="text-2xl sm:text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🐈‍⬛</span>
        </div>
        <p className="text-xs text-slate-300 font-serif">
          Explora los rincones del bosque encantado: árboles, arbustos, flores, rocas y el sendero.
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

      {/* Enchanted Garden / Forest Stage Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-gradient-to-b from-emerald-950/90 via-slate-950 to-emerald-950/90 border-2 border-emerald-700/60 overflow-hidden shadow-inner select-none">
        {/* Enchanted Forest Scenic Background Graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.18),transparent_75%)] pointer-events-none" />

        {/* Ambient forest scenery */}
        <div className="absolute top-2 left-6 text-5xl opacity-20 pointer-events-none">🌲</div>
        <div className="absolute top-10 left-28 text-3xl opacity-15 pointer-events-none">🌳</div>
        <div className="absolute top-4 right-10 text-4xl opacity-20 pointer-events-none">🌲</div>
        <div className="absolute bottom-6 left-12 text-4xl opacity-25 pointer-events-none">🪨</div>
        <div className="absolute bottom-3 right-20 text-3xl opacity-25 pointer-events-none">🌸</div>

        {/* Visual Winding Path in the garden */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-amber-500/25">
          <path
            d="M 50 280 Q 200 240, 300 290 T 500 260"
            fill="none"
            strokeWidth="20"
            strokeLinecap="round"
            className="opacity-40"
          />
        </svg>

        {/* Interactive Spots Scattered Organically */}
        {spots.map(spot => {
          const inspected = inspectedSpots.includes(spot.id);
          const hasManchas = spot.contains === 'manchas';
          const hasNegro = spot.contains === 'negro';

          return (
            <button
              key={spot.id}
              onClick={() => handleSpotClick(spot)}
              disabled={inspected}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute z-10 transition-all duration-300 flex flex-col items-center cursor-pointer ${
                inspected && hasManchas
                  ? 'scale-110'
                  : inspected && hasNegro
                  ? 'scale-110'
                  : inspected
                  ? 'opacity-60 scale-90'
                  : 'hover:scale-115 active:scale-95'
              }`}
            >
              {inspected && hasManchas ? (
                <div className="flex flex-col items-center animate-fadeIn">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/25 border-2 border-amber-400 p-1 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex items-center justify-center">
                    <img
                      src={getAssetUrl('assets/characters/manchas.png')}
                      alt="Manchas"
                      className="w-full h-full object-contain animate-bounce"
                    />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-amber-400 text-[10px] font-bold text-amber-200 font-serif">
                    ¡Manchas!
                  </span>
                </div>
              ) : inspected && hasNegro ? (
                <div className="flex flex-col items-center animate-fadeIn">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-500/25 border-2 border-indigo-400 p-1 shadow-[0_0_20px_rgba(129,140,248,0.6)] flex items-center justify-center">
                    <img
                      src={getAssetUrl('assets/characters/negro.png')}
                      alt="Negro"
                      className="w-full h-full object-contain animate-bounce"
                    />
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-indigo-400 text-[10px] font-bold text-indigo-200 font-serif">
                    ¡Negro!
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border-2 border-emerald-500/60 group-hover:border-amber-400 flex items-center justify-center text-2xl sm:text-3xl shadow-lg transition-all">
                    <span>{spot.icon}</span>
                  </div>
                  <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/90 border border-emerald-800/80 text-[10px] font-serif font-bold text-emerald-200 whitespace-nowrap shadow">
                    {spot.name}
                  </span>
                </div>
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
