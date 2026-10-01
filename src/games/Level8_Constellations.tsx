import React, { useState, useEffect } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { Star, CheckCircle2, RotateCcw, Compass, Eye } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface ConstellationStar {
  id: number;
  order: number;
  x: number; // percentage
  y: number; // percentage
  name: string;
}

const LIBRA_STARS: ConstellationStar[] = [
  { id: 1, order: 1, x: 22, y: 60, name: 'Zubenelgenubi (Alfa)' },
  { id: 2, order: 2, x: 50, y: 22, name: 'Zubeneschamali (Beta)' },
  { id: 3, order: 3, x: 75, y: 38, name: 'Zubenelakrab (Gamma)' },
  { id: 4, order: 4, x: 82, y: 68, name: 'Upsilon Librae' },
  { id: 5, order: 5, x: 48, y: 78, name: 'Brachium (Sigma)' }
];

export const Level8_Constellations: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication, unlockSecret } = useGame();

  const [connectedOrder, setConnectedOrder] = useState<number[]>([]);
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('Observa el orden de las estrellas de Libra. Memoriza el sendero estelar...');
  const [isDone, setIsDone] = useState<boolean>(false);

  // Auto-hide preview guide after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGuide(false);
      setFeedback('¡Ahora es tu turno! Toca la Estrella 1 para comenzar a trazar la constelación.');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const handleStarClick = (star: ConstellationStar) => {
    if (isDone) return;

    const nextExpectedOrder = connectedOrder.length + 1;

    if (star.order === nextExpectedOrder) {
      soundEngine.playSparkle();
      const updated = [...connectedOrder, star.order];
      setConnectedOrder(updated);

      if (updated.length === LIBRA_STARS.length) {
        soundEngine.playSuccess();
        unlockDedication('dedication_dreams');
        unlockSecret('secret_3');
        addLifePoints(150, '🔎 +150 Exploración: ¡Constelación de Libra Revelada!');
        setFeedback('✨ ¡Constelación de Libra ♎ completada en perfecta armonía!');
        setIsDone(true);
      } else {
        setFeedback(`¡Bien! Conectada estrella ${star.order}. Busca la estrella ${nextExpectedOrder + 1}...`);
      }
    } else if (connectedOrder.includes(star.order)) {
      soundEngine.playClick();
    } else {
      soundEngine.playObstacle();
      setFeedback(`¡Esa no es la siguiente estrella! La secuencia se reinicia suavemente. Comienza desde la estrella 1.`);
      setConnectedOrder([]);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setConnectedOrder([]);
    setShowGuide(true);
    setFeedback('Guía reactivada. Memoriza el orden de las estrellas...');
    setTimeout(() => {
      setShowGuide(false);
      setFeedback('Toca la Estrella 1 para comenzar a trazar.');
    }, 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-700/40 text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-amber-300 animate-spin-slow" />
          <h3 className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
            Constelación de Libra ♎
          </h3>
          <span className="text-xl text-purple-300 font-bold">♎</span>
        </div>
        <p className="text-xs text-slate-300">
          Conecta las estrellas en el orden celestial correcto para dibujar la balanza cósmica de Mari.
        </p>
      </div>

      {/* Narrative Guide / Feedback Banner */}
      <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950/80 border border-indigo-800/40 text-xs">
        <span className="text-amber-200 font-serif italic line-clamp-1">{feedback}</span>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] text-indigo-300 hover:text-indigo-200 shrink-0 ml-2"
        >
          {showGuide ? <RotateCcw className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showGuide ? 'Reiniciar' : 'Ver Guía'}</span>
        </button>
      </div>

      {/* Sky Canvas / Constellation Viewport */}
      <div className="relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950/90 to-slate-950 border border-indigo-800/60 overflow-hidden shadow-inner select-none">
        {/* Subtle twinkling background stars */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(129,140,248,0.15),transparent_70%)] pointer-events-none" />

        {/* SVG connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {/* Guide preview lines */}
          {showGuide && (
            <polyline
              points={LIBRA_STARS.map(s => `${s.x}%,${s.y}%`).join(' ')}
              fill="none"
              stroke="rgba(251,191,36,0.25)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}

          {/* Actual player connected lines */}
          {connectedOrder.length > 1 && (
            <polyline
              points={connectedOrder
                .map(order => {
                  const s = LIBRA_STARS.find(star => star.order === order);
                  return s ? `${s.x}%,${s.y}%` : '';
                })
                .join(' ')}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              className="filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            />
          )}

          {/* Completed extra balance support line */}
          {isDone && (
            <line
              x1="50%"
              y1="22%"
              x2="48%"
              y2="78%"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="3 3"
              className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] animate-pulse"
            />
          )}
        </svg>

        {/* Constellation Star Buttons */}
        {LIBRA_STARS.map(star => {
          const isConnected = connectedOrder.includes(star.order);
          const isNext = star.order === connectedOrder.length + 1;

          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              className={`absolute z-20 p-2 rounded-full transition-all duration-300 cursor-pointer ${
                isConnected
                  ? 'scale-125'
                  : isNext && !showGuide
                  ? 'animate-pulse hover:scale-130'
                  : 'hover:scale-120 active:scale-95'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {/* Glow ring */}
                <div
                  className={`absolute inset-0 rounded-full blur-md transition-opacity ${
                    isConnected
                      ? 'bg-amber-400/60 animate-ping opacity-70'
                      : 'bg-indigo-400/30 opacity-40'
                  }`}
                />

                <Star
                  className={`w-6 h-6 transition-colors ${
                    isConnected
                      ? 'text-amber-300 fill-amber-300 filter drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]'
                      : 'text-indigo-300 fill-indigo-900/60'
                  }`}
                />

                {/* Star order number badge */}
                {(showGuide || isConnected) && (
                  <span
                    className={`absolute -top-3 -right-2 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                      isConnected
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'bg-indigo-900/90 text-amber-200 border border-indigo-600'
                    }`}
                  >
                    {star.order}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        {/* Central Libra Watermark */}
        {isDone && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className="text-8xl text-indigo-400/20 font-serif animate-pulse">♎</span>
          </div>
        )}
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-amber-950 border border-amber-400 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              ¡Constelación de Libra ♎ Plenamente Iluminada!
            </h4>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-teal-300 font-serif">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>+150 Puntos de Exploración 🔎</span>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria de Sueños Desbloqueada
          </div>

          <p className="text-xs text-indigo-100 italic font-serif">
            "Libra representa el equilibrio, la dulzura, la justicia y la luz serena que guía cada uno de tus sueños."
          </p>

          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all active:scale-98"
          >
            Continuar al Siguiente Nivel →
          </button>
        </div>
      )}
    </div>
  );
};
