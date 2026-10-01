import React, { useState } from 'react';
import { useGame } from '../../state/GameContext';
import { Fireflies } from '../particles/Fireflies';
import { Stars } from '../particles/Stars';
import { soundEngine } from '../../audio/soundEngine';
import { Volume2, VolumeX, HelpCircle, Sparkles, BookOpen, Settings } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

/* ─── Carta Mágica de Mari (estilo Tarot) ─────────────────────────────────── */
const MariTarotCard: React.FC = () => {
  const [flipping, setFlipping] = useState(false);

  const handleFlip = () => {
    if (flipping) return;
    setFlipping(true);
    // Después de completar la animación (1.1s), resetear para poder volver a hacer clic
    setTimeout(() => setFlipping(false), 1100);
  };

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '1000px', width: '180px', height: '272px' }}
      onClick={handleFlip}
    >
      {/* Wrapper: solo se anima cuando flipping=true */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          animation: flipping ? 'tarotFlip 1.1s cubic-bezier(0.4,0,0.2,1) forwards' : 'none',
          transition: flipping ? 'none' : 'transform 0.3s ease',
        }}
      >
        {/* Cara de la carta */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            boxShadow: flipping
              ? '0 0 70px rgba(16,185,129,0.7), 0 0 30px rgba(251,191,36,0.5), 0 24px 60px rgba(0,0,0,0.8)'
              : '0 0 35px rgba(16,185,129,0.3), 0 0 12px rgba(251,191,36,0.2), 0 12px 35px rgba(0,0,0,0.6)',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Fondo degradado de la carta */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/70 via-slate-900 to-emerald-950" />

          {/* Marco ornamental exterior */}
          <div
            className="absolute inset-[3px] rounded-xl border-2 border-amber-400/50 pointer-events-none z-10"
            style={{ boxShadow: 'inset 0 0 20px rgba(251,191,36,0.12)' }}
          />
          {/* Marco interior sutil */}
          <div className="absolute inset-[7px] rounded-lg border border-emerald-500/30 pointer-events-none z-10" />

          {/* Ornamentos en las esquinas */}
          <div className="absolute top-2 left-2  text-amber-400/70 text-xs z-20">✦</div>
          <div className="absolute top-2 right-2 text-amber-400/70 text-xs z-20">✦</div>
          <div className="absolute bottom-2 left-2  text-amber-400/70 text-xs z-20">✦</div>
          <div className="absolute bottom-2 right-2 text-amber-400/70 text-xs z-20">✦</div>

          {/* Encabezado de la carta */}
          <div className="absolute top-5 left-0 right-0 flex flex-col items-center z-20">
            <div className="font-serif text-[9px] tracking-[0.25em] text-amber-300/80 uppercase">El Sendero</div>
            <div
              className="font-serif text-[11px] font-bold tracking-widest text-amber-200 mt-0.5"
              style={{ textShadow: '0 0 10px rgba(251,191,36,0.6)' }}
            >
              ✦ Mari ✦
            </div>
          </div>

          {/* Avatar de Mari */}
          <div className="absolute inset-x-4 top-14 bottom-14 flex items-center justify-center z-10">
            <div
              className="relative w-full h-full rounded-lg overflow-hidden"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.18) 0%, rgba(15,23,42,0.6) 70%)',
              }}
            >
              <img
                src="/assets/characters/mari.png"
                alt="Mari — La Protagonista"
                className="w-full h-full object-contain object-center"
                style={{
                  filter: flipping
                    ? 'drop-shadow(0 0 22px rgba(16,185,129,0.9)) brightness(1.15)'
                    : 'drop-shadow(0 0 10px rgba(16,185,129,0.4))',
                  transition: 'filter 0.3s ease',
                }}
              />
              {/* Shimmer al flipear */}
              {flipping && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%, rgba(16,185,129,0.15) 100%)',
                  }}
                />
              )}
            </div>
          </div>

          {/* Pie de la carta */}
          <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center z-20">
            <div
              className="font-serif text-[9px] tracking-[0.2em] text-emerald-300/80 uppercase"
              style={{ textShadow: '0 0 8px rgba(16,185,129,0.5)' }}
            >
              Protagonista
            </div>
            <div className="mt-0.5 flex gap-1">
              <span className="text-[10px] opacity-70">🌿</span>
              <span className="text-[10px] opacity-70">✨</span>
              <span className="text-[10px] opacity-70">❤️</span>
            </div>
          </div>

          {/* Destellos parpadeantes (solo al flipear) */}
          {flipping && (
            <>
              <div className="absolute top-1/3 left-3 w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-ping" />
              <div className="absolute top-2/3 right-3 w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-ping" />
            </>
          )}
        </div>
      </div>

      {/* Indicador "toca para revelar" — visible solo cuando no está flipando */}
      {!flipping && (
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono text-emerald-500/50 whitespace-nowrap tracking-widest"
          style={{ textShadow: '0 0 6px rgba(16,185,129,0.3)' }}
        >
          ✦ toca la carta ✦
        </div>
      )}

      {/* Aura de luz bajo la carta */}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.4) 0%, transparent 70%)',
          filter: 'blur(6px)',
          opacity: flipping ? 1 : 0.45,
          transition: 'opacity 0.3s',
        }}
      />

      {/* Keyframes */}
      <style>{`
        @keyframes tarotFlip {
          0%   { transform: rotateY(0deg)   scale(1);    }
          25%  { transform: rotateY(90deg)  scale(1.06); }
          50%  { transform: rotateY(180deg) scale(1.08); }
          75%  { transform: rotateY(270deg) scale(1.06); }
          100% { transform: rotateY(360deg) scale(1);    }
        }
      `}</style>
    </div>
  );
};

/* ─── StartScreen ─────────────────────────────────────────────────────────── */
export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { gameState, toggleSound } = useGame();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const hasProgress = gameState.completedLevels.length > 0;

  const handleStartGame = () => {
    soundEngine.playSparkle();
    soundEngine.startAmbientMusic();
    onStart();
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-emerald-100 flex flex-col items-center justify-between p-6 overflow-hidden">
      {/* Fondos de partículas ambientales */}
      <Stars />
      <Fireflies count={45} />

      {/* ── Barra superior: Cómo jugar | Audio | Config ── */}
      <div className="w-full max-w-4xl flex items-center justify-end gap-2 z-10 pt-2">
        {/* Cómo jugar */}
        <button
          onClick={() => {
            soundEngine.playClick();
            setShowHowToPlay(true);
          }}
          className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-emerald-800/50 text-emerald-300 backdrop-blur-md transition-all active:scale-95 shadow-lg flex items-center gap-2 text-xs"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Cómo jugar</span>
        </button>

        {/* Audio */}
        <button
          onClick={toggleSound}
          className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-emerald-800/50 text-emerald-300 backdrop-blur-md transition-all active:scale-95 shadow-lg flex items-center gap-2 text-xs"
        >
          {gameState.soundEnabled ? (
            <>
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Audio ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>Audio OFF</span>
            </>
          )}
        </button>

        {/* Configuración */}
        <button
          className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-emerald-800/50 text-emerald-300 backdrop-blur-md transition-all active:scale-95 shadow-lg flex items-center gap-2 text-xs"
          title="Configuración"
          onClick={() => soundEngine.playClick()}
        >
          <Settings className="w-4 h-4 text-emerald-400" />
          <span>Config</span>
        </button>
      </div>

      {/* ── Contenido principal ── */}
      <div className="z-10 flex flex-col items-center text-center max-w-2xl my-auto py-6 gap-5">

        {/* Etiqueta edición especial */}
        <div className="text-xs font-mono tracking-[0.3em] text-amber-400/70 uppercase flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          <span>Edición Especial • 33 Años</span>
          <Sparkles className="w-3 h-3" />
        </div>

        {/* Título principal — siempre en una sola línea */}
        <h1
          className="font-serif font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-teal-100 whitespace-nowrap"
          style={{
            fontSize: 'clamp(1.6rem, 5vw, 3.5rem)',
            filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.8))',
          }}
        >
          EL SENDERO MÁGICO
        </h1>

        {/* Subtítulo cumpleaños */}
        <p className="font-serif italic text-sm sm:text-base text-emerald-200/90 max-w-md leading-relaxed border-y border-emerald-800/30 py-3 px-4">
          "Bienvenida a este mundo mágico, y bienvenida a tus 33"
        </p>

        {/* Carta de Mari */}
        <MariTarotCard />

        {/* Botón principal */}
        <button
          onClick={handleStartGame}
          className="mt-2 w-full max-w-xs py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-serif font-bold text-base sm:text-lg tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 border border-emerald-400/30"
        >
          <span className="text-amber-200 text-lg">✨</span>
          <span>{hasProgress ? 'Continuar Viaje' : 'Iniciar Viaje'}</span>
          <span className="text-amber-200 text-lg">✨</span>
        </button>
      </div>

      {/* ── Dedicatoria al pie — siempre en una sola línea ── */}
      <footer className="z-10 text-center font-serif pb-2 w-full px-4">
        <p
          className="whitespace-nowrap text-emerald-300/60 mx-auto"
          style={{ fontSize: 'clamp(0.55rem, 1.4vw, 0.75rem)' }}
        >
          Feliz cumpleaños, mi amor. Deseo que disfrutes la vida tanto como disfrutarás este juego ✨
        </p>
      </footer>

      {/* ── Modal Cómo jugar ── */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
          <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-emerald-950 border border-emerald-600/40 rounded-3xl p-6 shadow-2xl text-emerald-100 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-emerald-800/40 pb-3">
              <HelpCircle className="w-5 h-5 text-amber-300" />
              <h3 className="font-serif text-lg font-bold text-amber-200">📖 Cómo jugar El Sendero Mágico</h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-h-72 overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="text-xl">🌿</span>
                <div>
                  <div className="font-bold text-emerald-300">Explora 10 Niveles Narrativos</div>
                  <div>Cada nivel representa una dimensión especial de la vida: raíces, familia, hogar, gatas, amistades, amor y sueños.</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="text-xl">✨</span>
                <div>
                  <div className="font-bold text-amber-300">Acumula Puntos de Vida</div>
                  <div>Gana puntos explorando, resolviendo minijuegos y encontrando momentos felices con Manchas y Negro.</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="text-xl">🎰</span>
                <div>
                  <div className="font-bold text-purple-300">La Rueda de los 33</div>
                  <div>Al final del recorrido, tus Puntos de Vida desvelarán opciones en la gran Rueda de los 33 para celebrar tu viaje.</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <span className="text-xl">❤️</span>
                <div>
                  <div className="font-bold text-rose-300">No puedes perder</div>
                  <div>No hay castigos ni elecciones incorrectas. La curiosidad siempre recompensa con aprendizaje y sonrisas.</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                setShowHowToPlay(false);
              }}
              className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm transition-all"
            >
              ¡Entendido! Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
