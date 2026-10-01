import React from 'react';
import { useGame } from '../../state/GameContext';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles, Shield, Compass, Heart, Star, Award } from 'lucide-react';

interface JourneyStatsProps {
  onContinueToWheel: () => void;
}

export const JourneyStats: React.FC<JourneyStatsProps> = ({ onContinueToWheel }) => {
  const { gameState } = useGame();

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-slate-900/90 border border-amber-500/50 rounded-3xl shadow-2xl backdrop-blur-xl text-emerald-100 flex flex-col gap-6 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 mx-auto flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)]">
          🏆
        </div>
        <h2 className="font-serif font-bold text-amber-200 text-2xl">✨ Tu Viaje por el Sendero</h2>
        <p className="text-xs text-slate-300 font-serif italic">
          Resumen simbólico de todo lo que has explorado, aprendido y acumulado.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-center space-y-1">
          <Sparkles className="w-5 h-5 text-amber-300 mx-auto animate-pulse" />
          <div className="font-serif font-bold text-xl text-amber-200">{gameState.lifePoints}</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Puntos de Vida</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
          <Award className="w-5 h-5 text-emerald-300 mx-auto" />
          <div className="font-serif font-bold text-xl text-emerald-200">{gameState.completedLevels.length} / 10</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Niveles Superados</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-700 text-center space-y-1">
          <Shield className="w-5 h-5 text-blue-300 mx-auto" />
          <div className="font-serif font-bold text-xl text-blue-200">{gameState.obstaclesEncountered}</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Obstáculos</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center space-y-1">
          <Star className="w-5 h-5 text-purple-300 mx-auto" />
          <div className="font-serif font-bold text-xl text-purple-200">{gameState.secrets.length}</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Secretos</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-center space-y-1">
          <Compass className="w-5 h-5 text-indigo-300 mx-auto" />
          <div className="font-serif font-bold text-xl text-indigo-200">{gameState.experiences.length}</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Experiencias</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-1">
          <Heart className="w-5 h-5 text-rose-300 mx-auto" />
          <div className="font-serif font-bold text-xl text-rose-200">{gameState.dedications.length}</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-wide">Dedicatorias</div>
        </div>
      </div>

      {/* Wheel Tier Info */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 to-purple-950/60 border border-amber-400/50 text-center space-y-1">
        <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">
          ✨ Rueda de los 33 Desbloqueada
        </div>
        <p className="text-xs text-slate-200">
          Tus <span className="font-bold text-amber-300">{gameState.lifePoints} Puntos</span> han desvelado{' '}
          <span className="font-bold text-purple-300">{gameState.unlockedWheelOptions} opciones activas</span> en la gran Rueda de los 33.
        </p>
      </div>

      <button
        onClick={() => {
          soundEngine.playSparkle();
          onContinueToWheel();
        }}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-serif font-extrabold text-base tracking-wide shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all active:scale-98"
      >
        🎰 ir a la Rueda de los 33 →
      </button>
    </div>
  );
};
