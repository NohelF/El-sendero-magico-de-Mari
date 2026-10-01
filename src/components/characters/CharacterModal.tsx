import React from 'react';
import { CHARACTERS } from '../../data/characters';
import { soundEngine } from '../../audio/soundEngine';

interface CharacterModalProps {
  characterId: string;
  title?: string;
  lines: string[];
  onContinue: () => void;
  continueText?: string;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  characterId,
  title,
  lines,
  onContinue,
  continueText = 'Continuar...'
}) => {
  const char = CHARACTERS[characterId] || CHARACTERS.guardiana;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-emerald-950/90 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 shadow-[0_0_40px_rgba(16,185,129,0.2)] text-emerald-100 flex flex-col gap-5">
        
        {/* Header with Avatar & Character Info */}
        <div className="flex items-center gap-4 border-b border-emerald-800/40 pb-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 shrink-0"
            style={{ backgroundColor: `${char.color}20`, borderColor: char.color }}
          >
            <img src={char.image} alt={char.name} className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold tracking-wide" style={{ color: char.color }}>
              {char.name}
            </h3>
            <p className="text-xs text-slate-400 font-sans tracking-wide uppercase">{char.role}</p>
          </div>
        </div>

        {/* Narrative Title / Context */}
        {title && (
          <h4 className="font-serif text-lg text-amber-200 text-center border-b border-amber-500/20 pb-2">
            {title}
          </h4>
        )}

        {/* Lines */}
        <div className="flex flex-col gap-3 font-serif text-slate-200 text-base leading-relaxed py-2 max-h-60 overflow-y-auto custom-scrollbar">
          {lines.map((line, idx) => (
            <p key={idx} className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800/80 italic">
              "{line}"
            </p>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onContinue();
          }}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-center tracking-wide shadow-lg shadow-emerald-900/40 active:scale-98 transition-all"
        >
          {continueText}
        </button>
      </div>
    </div>
  );
};
