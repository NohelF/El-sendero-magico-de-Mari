import React, { useState, useEffect } from 'react';
import { CHARACTERS } from '../../data/characters';
import { soundEngine } from '../../audio/soundEngine';

interface CharacterDialogueProps {
  characterId: string;
  text: string;
  onComplete?: () => void;
  continueLabel?: string;
  positionPlacement?: 'top' | 'bottom';
}

export const CharacterDialogue: React.FC<CharacterDialogueProps> = ({
  characterId,
  text,
  onComplete,
  continueLabel = 'Tocar para continuar ▶',
  positionPlacement = 'top'
}) => {
  const char = CHARACTERS[characterId] || CHARACTERS.mari;
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTypingComplete(false);
    let index = 0;

    const timer = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [text]);

  const handleClick = () => {
    if (!isTypingComplete) {
      // Fast-forward typewriter
      setDisplayedText(text);
      setIsTypingComplete(true);
      soundEngine.playClick();
    } else if (onComplete) {
      soundEngine.playClick();
      onComplete();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`z-30 cursor-pointer max-w-xs sm:max-w-md w-full transition-all duration-300 animate-fadeIn ${
        positionPlacement === 'top' ? 'mb-3' : 'mt-3'
      }`}
    >
      <div
        className="relative p-4 rounded-2xl bg-slate-950/85 backdrop-blur-md border shadow-[0_0_25px_rgba(0,0,0,0.6)] text-slate-100 font-serif"
        style={{
          borderColor: char.color,
          boxShadow: `0 0 20px ${char.color}30`
        }}
      >
        {/* Character Label Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold tracking-wide" style={{ color: char.color }}>
            <span>{char.name}</span>
            <span className="text-[10px] text-slate-400 font-sans uppercase font-normal">({char.role.split(' ')[1] || char.role})</span>
          </div>
          {isTypingComplete && (
            <span className="text-[10px] font-sans text-amber-300 animate-pulse">
              {continueLabel}
            </span>
          )}
        </div>

        {/* Typed Text */}
        <p className="text-xs sm:text-sm leading-relaxed text-slate-100 italic">
          "{displayedText}"
          {!isTypingComplete && <span className="inline-block w-1.5 h-4 ml-0.5 bg-amber-300 animate-pulse" />}
        </p>

        {/* Speech Bubble Pointer */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent ${
            positionPlacement === 'top'
              ? '-bottom-2 border-t-[8px]'
              : '-top-2 border-b-[8px]'
          }`}
          style={{
            borderTopColor: positionPlacement === 'top' ? char.color : 'transparent',
            borderBottomColor: positionPlacement === 'bottom' ? char.color : 'transparent'
          }}
        />
      </div>
    </div>
  );
};
