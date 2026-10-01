import React, { useState } from 'react';
import { CHARACTERS } from '../../data/characters';
import { soundEngine } from '../../audio/soundEngine';
import { CharacterDialogue } from './CharacterDialogue';
import { Sparkles } from 'lucide-react';

export type PositionPreset = 'left' | 'center' | 'right';
export type AnimationType =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideLeft'
  | 'slideRight'
  | 'rise'
  | 'magicalAppear'
  | 'bounce'
  | 'shake'
  | 'interact'
  | 'idle';

interface CharacterSpriteProps {
  character: string;
  position?: PositionPreset;
  x?: string;
  y?: string;
  scale?: number;
  animation?: AnimationType;
  activeFocus?: boolean;
  dialogue?: string;
  onDialogueComplete?: () => void;
  onInteract?: () => void;
  actionLabel?: string;
  showInteractPrompt?: boolean;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  character,
  position = 'center',
  x,
  y,
  scale = 1.0,
  animation = 'idle',
  activeFocus = true,
  dialogue,
  onDialogueComplete,
  onInteract,
  actionLabel = '✨ Hablar',
  showInteractPrompt = false
}) => {
  const char = CHARACTERS[character] || CHARACTERS.mari;
  const [isInteracting, setIsInteracting] = useState(false);

  // Position Styles calculation
  const getPresetStyles = (): React.CSSProperties => {
    if (x || y) {
      return {
        position: 'absolute',
        left: x || '50%',
        top: y || '50%',
        transform: 'translate(-50%, -50%)'
      };
    }

    switch (position) {
      case 'left':
        return { position: 'relative', justifySelf: 'start' };
      case 'right':
        return { position: 'relative', justifySelf: 'end' };
      case 'center':
      default:
        return { position: 'relative', justifySelf: 'center' };
    }
  };

  // Combine base scale with prop scale
  const finalScale = char.baseScale * scale;

  // Animation CSS class builder
  const getAnimationClass = () => {
    switch (animation) {
      case 'magicalAppear':
        return 'animate-fadeIn scale-105 transition-all duration-700';
      case 'slideLeft':
        return 'animate-fadeIn translate-x-4 transition-all duration-500';
      case 'slideRight':
        return 'animate-fadeIn -translate-x-4 transition-all duration-500';
      case 'rise':
        return 'animate-fadeIn translate-y-6 transition-all duration-500';
      case 'bounce':
        return 'animate-bounce';
      case 'shake':
        return 'animate-pulse';
      case 'interact':
        return 'scale-110 rotate-3 transition-transform duration-300';
      case 'fadeIn':
      default:
        return 'animate-fadeIn transition-opacity duration-500';
    }
  };

  const handleSpriteClick = () => {
    soundEngine.playSparkle();
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 400);

    if (onInteract) {
      onInteract();
    }
  };

  return (
    <div
      style={getPresetStyles()}
      className={`z-20 flex flex-col items-center select-none ${getAnimationClass()}`}
    >
      {/* Speech Bubble (Rendered dynamically above character) */}
      {dialogue && (
        <CharacterDialogue
          characterId={char.id}
          text={dialogue}
          onComplete={onDialogueComplete}
        />
      )}

      {/* Character Image & Idle Breathing Container */}
      <div
        onClick={handleSpriteClick}
        className={`relative group cursor-pointer transition-all duration-300 ${
          activeFocus ? 'brightness-105' : 'brightness-75 opacity-80'
        } ${isInteracting ? 'scale-110' : ''}`}
        style={{ transform: `scale(${finalScale})` }}
      >
        {/* Soft Glowing Aura behind character */}
        <div
          className="absolute inset-0 rounded-full filter blur-xl opacity-40 transition-opacity group-hover:opacity-70"
          style={{ backgroundColor: char.color }}
        />

        {/* Official PNG Sprite */}
        <img
          src={char.image}
          alt={char.name}
          className="w-32 h-32 sm:w-44 sm:h-44 object-contain relative z-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-1000 ease-in-out hover:scale-105"
        />

        {/* Interactive Prompt Badge */}
        {showInteractPrompt && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-slate-950/90 border border-amber-400 text-amber-200 text-xs font-bold font-serif shadow-lg flex items-center gap-1 whitespace-nowrap animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{actionLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};
