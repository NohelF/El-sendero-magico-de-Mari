import React, { useState } from 'react';
import { CharacterSprite } from './CharacterSprite';
import type { PositionPreset, AnimationType } from './CharacterSprite';
import { useGame } from '../../state/GameContext';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles } from 'lucide-react';

export interface DialogueStepData {
  character: string;
  text: string;
  position?: PositionPreset;
  x?: string;
  y?: string;
  animation?: AnimationType;
  onInteractReward?: {
    addLifePoints?: number;
    discoverSecret?: string;
    unlockDedication?: string;
    message?: string;
  };
}

interface CharacterSceneProps {
  steps: DialogueStepData[];
  onSceneComplete: () => void;
  backgroundGraphic?: string;
}

export const CharacterScene: React.FC<CharacterSceneProps> = ({
  steps,
  onSceneComplete,
  backgroundGraphic
}) => {
  const { addLifePoints, unlockSecret, unlockDedication } = useGame();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [rewardNotice, setRewardNotice] = useState<string | null>(null);

  const currentStep = steps[currentStepIndex];

  // Determine unique active characters present in current scene to render them in position
  const sceneCharacters = Array.from(new Set(steps.map(s => s.character)));

  const handleNextStep = () => {
    // Check if current step has attached gameplay rewards
    if (currentStep.onInteractReward) {
      const reward = currentStep.onInteractReward;
      if (reward.addLifePoints) {
        addLifePoints(reward.addLifePoints, reward.message);
      }
      if (reward.discoverSecret) {
        unlockSecret(reward.discoverSecret);
      }
      if (reward.unlockDedication) {
        unlockDedication(reward.unlockDedication);
      }
      if (reward.message) {
        setRewardNotice(reward.message);
        setTimeout(() => setRewardNotice(null), 3000);
      }
    }

    if (currentStepIndex < steps.length - 1) {
      soundEngine.playClick();
      setCurrentStepIndex(prev => prev + 1);
    } else {
      soundEngine.playSuccess();
      onSceneComplete();
    }
  };

  return (
    <div className="relative w-full max-w-2xl h-[420px] sm:h-[460px] rounded-3xl bg-slate-900/80 border border-emerald-600/40 shadow-2xl backdrop-blur-md p-4 flex flex-col justify-between overflow-hidden">
      
      {/* Background graphic if provided */}
      {backgroundGraphic && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none rounded-3xl"
          style={{ backgroundImage: `url(${backgroundGraphic})` }}
        />
      )}

      {/* Floating Reward Toast */}
      {rewardNotice && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-amber-500/90 border border-amber-300 text-slate-950 font-bold font-serif text-xs shadow-xl flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{rewardNotice}</span>
        </div>
      )}

      {/* Characters Compositions Stage */}
      <div className="relative flex-1 w-full flex items-end justify-around pb-6">
        {sceneCharacters.map((charId, idx) => {
          const isSpeaking = currentStep.character === charId;

          // Default positioning for 1, 2, or 3 characters
          let defaultPos: PositionPreset = 'center';
          if (sceneCharacters.length === 2) {
            defaultPos = idx === 0 ? 'left' : 'right';
          } else if (sceneCharacters.length >= 3) {
            defaultPos = idx === 0 ? 'left' : idx === 1 ? 'center' : 'right';
          }

          return (
            <CharacterSprite
              key={charId}
              character={charId}
              position={currentStep.position || defaultPos}
              x={isSpeaking ? currentStep.x : undefined}
              y={isSpeaking ? currentStep.y : undefined}
              animation={isSpeaking ? currentStep.animation || 'idle' : 'idle'}
              activeFocus={isSpeaking}
              dialogue={isSpeaking ? currentStep.text : undefined}
              onDialogueComplete={handleNextStep}
              onInteract={handleNextStep}
            />
          );
        })}
      </div>

      {/* Footer Step Indicator & Advance Bar */}
      <div className="z-30 w-full px-4 py-3 bg-slate-950/80 rounded-2xl border border-emerald-800/40 flex items-center justify-between">
        <span className="text-xs font-mono text-emerald-400">
          Escena: Conversación ({currentStepIndex + 1} / {steps.length})
        </span>

        <button
          onClick={handleNextStep}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
        >
          <span>{currentStepIndex < steps.length - 1 ? 'Avanzar Diálogo ▶' : 'Continuar Sendero ✨'}</span>
        </button>
      </div>
    </div>
  );
};
