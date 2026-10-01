import React from 'react';
import { useGame } from '../../state/GameContext';
import { Volume2, VolumeX, Menu, Sparkles } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface TopBarProps {
  onOpenMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenMenu }) => {
  const { gameState, toggleSound } = useGame();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 bg-slate-950/70 backdrop-blur-md border-b border-emerald-900/40 flex items-center justify-between text-emerald-100 shadow-lg">
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenMenu();
          }}
          className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 transition-all flex items-center gap-2 text-sm font-medium active:scale-95"
          aria-label="Abrir Menú Principal"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">Menú</span>
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-emerald-800/40 text-xs text-emerald-300 font-serif">
          <span>🌿 El Sendero de Mari</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Life Points Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-bold text-sm tracking-wide">{gameState.lifePoints}</span>
          <span className="text-[10px] text-amber-300/80 uppercase font-sans hidden xs:inline">Puntos</span>
        </div>

        {/* Audio Mute Toggle */}
        <button
          onClick={() => {
            toggleSound();
          }}
          className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/50 text-slate-300 transition-all active:scale-95"
          title={gameState.soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
        >
          {gameState.soundEnabled ? (
            <Volume2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <VolumeX className="w-5 h-5 text-slate-500" />
          )}
        </button>
      </div>
    </header>
  );
};
