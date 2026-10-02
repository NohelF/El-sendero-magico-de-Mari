import React from 'react';
import { useGame } from '../../state/GameContext';
import { LEVELS } from '../../data/levels';
import { SECRETS } from '../../data/secrets';
import { soundEngine } from '../../audio/soundEngine';
import { getAssetUrl } from '../../utils/assets';
import { Check, Lock, Sparkles, Compass, Star } from 'lucide-react';

interface LivingMapProps {
  onSelectLevel: (levelId: number) => void;
  onOpenWheel: () => void;
}

export const LivingMap: React.FC<LivingMapProps> = ({ onSelectLevel, onOpenWheel }) => {
  const { gameState } = useGame();

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return gameState.completedLevels.includes(levelId - 1) || gameState.completedLevels.includes(levelId);
  };

  const isLevelCompleted = (levelId: number) => {
    return gameState.completedLevels.includes(levelId);
  };

  // Node layout coordinates (percentage x, y) creating a winding magical trail
  const nodePositions = [
    { x: 20, y: 88 }, // Level 1 (Jardín del Inicio)
    { x: 38, y: 78 }, // Level 2 (Las Raíces)
    { x: 65, y: 72 }, // Level 3 (Árbol Familiar)
    { x: 80, y: 58 }, // Level 4 (Hogar Felino)
    { x: 55, y: 48 }, // Level 5 (Los Puentes)
    { x: 28, y: 42 }, // Level 6 (Compañeros)
    { x: 35, y: 26 }, // Level 7 (Camino del Amor)
    { x: 62, y: 22 }, // Level 8 (Constelaciones)
    { x: 78, y: 15 }, // Level 9 (Valle de Niebla)
    { x: 50, y: 8 }   // Level 10 (El Mirador)
  ];

  // Current position of Mari and her spiritual guides
  const currentPos = nodePositions[gameState.currentLevel - 1] || nodePositions[0];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-emerald-100 flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden">
      
      {/* Background Enchanted Forest Graphic */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 pointer-events-none" />

      {/* Title Header */}
      <div className="z-10 w-full max-w-4xl text-center pt-14 pb-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-mono mb-1">
          <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>MAPA VIVO DEL BOSQUE ENCANTADO</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
          El Sendero de Mari
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 font-serif italic">
          Mari avanza guiada por sus espíritus protectores Manchas y Negro. Toca un nivel para continuar el viaje.
        </p>
      </div>

      {/* Main Interactive Trail Canvas / SVG Map */}
      <div className="z-10 relative w-full max-w-3xl h-[650px] sm:h-[700px] my-3 rounded-3xl bg-slate-900/75 border-2 border-emerald-700/50 backdrop-blur-md overflow-hidden shadow-2xl">
        
        {/* Layered Enchanted Forest Scenery Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Summit Aurora & Stars (Level 10) */}
          <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.22),transparent_70%)]" />
          
          {/* Storm Mist (Level 9) */}
          <div className="absolute top-12 right-6 w-52 h-36 bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_70%)] blur-xl" />

          {/* Golden Romantic Hearth (Level 7) */}
          <div className="absolute top-36 left-12 w-60 h-44 bg-[radial-gradient(circle,rgba(244,63,94,0.15),transparent_70%)] blur-xl" />

          {/* Warm Home & Bridge Waters (Levels 4-5) */}
          <div className="absolute top-64 right-10 w-64 h-48 bg-[radial-gradient(circle,rgba(245,158,11,0.15),transparent_70%)] blur-xl" />

          {/* Deep Forest Roots (Levels 1-3) */}
          <div className="absolute bottom-0 inset-x-0 h-56 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.25),transparent_70%)]" />

          {/* Scenic Environmental Decorations scattered organically */}
          <span className="absolute top-4 left-10 text-3xl opacity-20">🌌</span>
          <span className="absolute top-6 right-16 text-4xl opacity-25">✨</span>
          <span className="absolute top-24 left-8 text-4xl opacity-20">🌲</span>
          <span className="absolute top-28 right-8 text-4xl opacity-25">🌧️</span>
          <span className="absolute top-44 left-14 text-3xl opacity-25">❤️</span>
          <span className="absolute top-52 right-12 text-4xl opacity-20">🐾</span>
          <span className="absolute top-64 left-10 text-3xl opacity-25">🌉</span>
          <span className="absolute bottom-32 right-12 text-3xl opacity-25">🐈</span>
          <span className="absolute bottom-20 left-12 text-4xl opacity-25">🌳</span>
          <span className="absolute bottom-8 right-24 text-3xl opacity-25">🌸</span>
          <span className="absolute bottom-4 left-32 text-3xl opacity-20">🪨</span>
        </div>

        {/* SVG Path Lines connecting level nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-500/40">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connect node lines */}
          {nodePositions.map((pos, idx) => {
            if (idx === nodePositions.length - 1) return null;
            const nextPos = nodePositions[idx + 1];
            const unlocked = isLevelUnlocked(idx + 2);

            return (
              <g key={`line-group-${idx}`}>
                {/* Subtle path background */}
                <line
                  x1={`${pos.x}%`}
                  y1={`${pos.y}%`}
                  x2={`${nextPos.x}%`}
                  y2={`${nextPos.y}%`}
                  stroke={unlocked ? 'url(#pathGradient)' : '#334155'}
                  strokeWidth={unlocked ? '4' : '2'}
                  strokeDasharray={unlocked ? '8,6' : '4,4'}
                  filter={unlocked ? 'url(#glow)' : undefined}
                  className={unlocked ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}

          {/* Secret paths lines */}
          {SECRETS.map(secret => {
            if (!gameState.secrets.includes(secret.id)) return null;
            const parentPos = nodePositions[secret.levelId - 1];
            return (
              <line
                key={secret.id}
                x1={`${parentPos.x}%`}
                y1={`${parentPos.y}%`}
                x2={`${parentPos.x + 10}%`}
                y2={`${parentPos.y - 5}%`}
                stroke="#c084fc"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            );
          })}
        </svg>

        {/* Secret Path Badges if discovered */}
        {SECRETS.map(secret => {
          if (!gameState.secrets.includes(secret.id)) return null;
          const parentPos = nodePositions[secret.levelId - 1];
          return (
            <div
              key={`secret-badge-${secret.id}`}
              className="absolute z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-950/90 border border-purple-500/60 text-purple-200 text-[10px] font-bold shadow-lg"
              style={{ left: `${parentPos.x + 8}%`, top: `${parentPos.y - 8}%` }}
            >
              <Star className="w-3 h-3 text-amber-300 fill-current animate-bounce" />
              <span>{secret.name}</span>
            </div>
          );
        })}

        {/* Mari + Spiritual Guides (Manchas & Negro) traveling group */}
        <div
          className="absolute z-30 pointer-events-none flex flex-col items-center transition-all duration-1000 ease-in-out"
          style={{
            left: `${currentPos.x}%`,
            top: `${currentPos.y}%`,
            transform: 'translate(-50%, -125%)'
          }}
        >
          {/* Trio Character Sprites */}
          <div className="relative flex items-end justify-center">
            {/* Manchas (left, spiritual guide) */}
            <div className="relative -mr-2.5 z-10 animate-bounce" style={{ animationDuration: '2.5s' }}>
              <img
                src={getAssetUrl('assets/characters/manchas.png')}
                alt="Manchas"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              />
            </div>

            {/* Mari (center protagonist) */}
            <div className="relative z-20 animate-bounce" style={{ animationDuration: '2s' }}>
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md animate-pulse" />
              <img
                src={getAssetUrl('assets/characters/mari.png')}
                alt="Mari"
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain relative z-10 drop-shadow-[0_6px_12px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]"
              />
            </div>

            {/* Negro (right, spiritual guide) */}
            <div className="relative -ml-2.5 z-10 animate-bounce" style={{ animationDuration: '2.8s' }}>
              <img
                src={getAssetUrl('assets/characters/negro.png')}
                alt="Negro"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] filter drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]"
              />
            </div>
          </div>

          {/* Guías espirituales badge */}
          <div className="mt-0.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-amber-400/70 text-amber-200 text-[9px] font-serif font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
            <span>🐾 Mari, Manchas y Negro</span>
          </div>
        </div>

        {/* Level Nodes */}
        {LEVELS.map((lvl, idx) => {
          const pos = nodePositions[idx];
          const unlocked = isLevelUnlocked(lvl.id);
          const completed = isLevelCompleted(lvl.id);
          const isCurrent = gameState.currentLevel === lvl.id;

          return (
            <button
              key={lvl.id}
              onClick={() => {
                if (unlocked) {
                  soundEngine.playClick();
                  onSelectLevel(lvl.id);
                } else {
                  soundEngine.playObstacle();
                }
              }}
              disabled={!unlocked}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                unlocked ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-not-allowed opacity-50'
              }`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing Node Button */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold text-base transition-all shadow-xl border-2 ${
                    completed
                      ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 border-amber-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : unlocked
                      ? isCurrent
                        ? 'bg-gradient-to-tr from-amber-500 to-amber-600 border-amber-200 text-white shadow-[0_0_25px_rgba(245,158,11,0.6)] animate-pulse'
                        : 'bg-slate-800 border-emerald-500 text-emerald-200 hover:border-amber-300'
                      : 'bg-slate-950 border-slate-700 text-slate-500'
                  }`}
                >
                  {completed ? (
                    <Check className="w-6 h-6 text-amber-200 stroke-[3]" />
                  ) : unlocked ? (
                    <span>{lvl.id}</span>
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                </div>

                {/* Level Title Badge */}
                <div
                  className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-serif font-medium whitespace-nowrap shadow-md border ${
                    completed
                      ? 'bg-emerald-950/90 border-emerald-600/60 text-emerald-200'
                      : unlocked
                      ? 'bg-slate-900/90 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950/90 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{lvl.title.split('—')[1] || lvl.title}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer shortcut to Rueda de los 33 */}
      <div className="z-10 w-full max-w-3xl flex items-center justify-between gap-3 pt-2">
        <div className="text-xs font-serif text-slate-400">
          Puntos acumulados: <span className="text-amber-300 font-bold">{gameState.lifePoints} Pts</span>
        </div>

        <button
          onClick={() => {
            soundEngine.playSparkle();
            onOpenWheel();
          }}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-100 font-serif font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 border border-amber-400/30 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>🎰 Rueda de los 33 ({gameState.unlockedWheelOptions} Opciones)</span>
        </button>
      </div>
    </div>
  );
};
