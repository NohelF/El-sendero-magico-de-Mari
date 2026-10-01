import React, { useState } from 'react';
import { useGame } from '../../state/GameContext';
import { LEVELS } from '../../data/levels';
import { CharacterScene } from '../characters/CharacterScene';
import type { DialogueStepData } from '../characters/CharacterScene';
import { Level1_GardenTracks } from '../../games/Level1_GardenTracks';
import { Level2_RootsConnect } from '../../games/Level2_RootsConnect';
import { Level3_FamilyBranches } from '../../games/Level3_FamilyBranches';
import { Level4_CatSanctuary } from '../../games/Level4_CatSanctuary';
import { Level5_BridgesOfFriendship } from '../../games/Level5_BridgesOfFriendship';
import { Level6_BackpackPacking } from '../../games/Level6_BackpackPacking';
import { Level7_LovePath } from '../../games/Level7_LovePath';
import { Level8_Constellations } from '../../games/Level8_Constellations';
import { Level9_StormValley } from '../../games/Level9_StormValley';
import { Level10_MiradorReveal } from '../../games/Level10_MiradorReveal';
import { soundEngine } from '../../audio/soundEngine';

interface LevelScreenProps {
  levelId: number;
  onNavigateToMap: () => void;
  onNavigateToStats: () => void;
}

export const LevelScreen: React.FC<LevelScreenProps> = ({
  levelId,
  onNavigateToMap,
  onNavigateToStats
}) => {
  const { completeLevel } = useGame();
  const levelDef = LEVELS.find(l => l.id === levelId) || LEVELS[0];

  const [phase, setPhase] = useState<'intro' | 'playing' | 'outro'>('intro');

  // Multi-character scene conversations for level intros
  const getLevelIntroSceneSteps = (): DialogueStepData[] => {
    switch (levelId) {
      case 1:
        return [
          { character: 'manchas', text: 'Bienvenida al comienzo del viaje, Mari. Todo sendero tiene flores y piedras.', animation: 'magicalAppear' },
          { character: 'negro', text: '¿Quieres saber qué hay al otro lado del jardín?', animation: 'fadeIn' },
          { character: 'mari', text: 'Siento una paz hermosa en el aire... Comencemos a explorar.', animation: 'rise' }
        ];
      case 4:
        return [
          { character: 'manchas', text: '¡Bienvenida a nuestro hogar! Aquí cada rincón guarda recuerdos dulces.', animation: 'magicalAppear' },
          { character: 'negro', text: 'Zafiro conoce pasadizos secretos y Kitty... bueno, Kitty está dormida en el pasillo.', animation: 'fadeIn' },
          { character: 'mari', text: '¡Vamos a saludar a las gatas!', animation: 'bounce' }
        ];
      case 7:
        return [
          { character: 'mari', text: '¿Crees que debemos seguir por este sendero?', position: 'left', animation: 'slideRight' },
          { character: 'nohel', text: 'Creo que ya hemos llegado demasiado lejos como para regresar. Caminar a tu lado lo vale todo.', position: 'right', animation: 'slideLeft' },
          { character: 'manchas', text: 'Entonces es momento de unir los dos caminos en uno solo.', position: 'center', animation: 'magicalAppear' }
        ];
      case 9:
        return [
          { character: 'cuervo', text: '¿Segura de que puedes continuar? ¿Y si la niebla es demasiado espesa?', animation: 'fadeIn' },
          { character: 'mari', text: 'He cruzado valles fríos antes y sé que la lluvia limpia el camino.', animation: 'rise' }
        ];
      case 10:
        return [
          { character: 'guardiana', text: 'Mira cuánto has recorrido desde aquel primer jardín, Mari. Contempla el mapa entero.', animation: 'magicalAppear' },
          { character: 'mari', text: 'Siento que conozco este lugar... y que te conozco a ti.', animation: 'rise' },
          { character: 'guardiana', text: 'No soy una extraña... Soy tú, de algunos años más adelante.', animation: 'bounce' }
        ];
      default:
        return [
          {
            character: levelDef.guideCharacter,
            text: levelDef.narrativeIntro[0] || 'Avanza en el sendero...',
            animation: 'fadeIn'
          },
          {
            character: 'mari',
            text: levelDef.narrativeIntro[1] || 'Sigamos adelante.',
            animation: 'rise'
          }
        ];
    }
  };

  const getLevelOutroSceneSteps = (): DialogueStepData[] => {
    return [
      {
        character: levelDef.guideCharacter,
        text: levelDef.narrativeOutro[0] || '¡Excelente trabajo en este nivel!',
        animation: 'magicalAppear'
      },
      {
        character: 'mari',
        text: '¡El sendero sigue iluminándose!',
        animation: 'bounce'
      }
    ];
  };

  const handleMinigameComplete = () => {
    completeLevel(levelId);
    if (levelId === 10) {
      onNavigateToStats();
    } else {
      setPhase('outro');
    }
  };

  const renderMinigame = () => {
    switch (levelDef.minigameType) {
      case 'garden_tracks':
        return <Level1_GardenTracks onComplete={handleMinigameComplete} />;
      case 'roots_connect':
        return <Level2_RootsConnect onComplete={handleMinigameComplete} />;
      case 'family_branches':
        return <Level3_FamilyBranches onComplete={handleMinigameComplete} />;
      case 'cat_sanctuary':
        return <Level4_CatSanctuary onComplete={handleMinigameComplete} />;
      case 'bridges':
        return <Level5_BridgesOfFriendship onComplete={handleMinigameComplete} />;
      case 'backpack':
        return <Level6_BackpackPacking onComplete={handleMinigameComplete} />;
      case 'love_path':
        return <Level7_LovePath onComplete={handleMinigameComplete} />;
      case 'constellations':
        return <Level8_Constellations onComplete={handleMinigameComplete} />;
      case 'storm_valley':
        return <Level9_StormValley onComplete={handleMinigameComplete} />;
      case 'mirador':
        return <Level10_MiradorReveal onComplete={onNavigateToStats} />;
      default:
        return <Level1_GardenTracks onComplete={handleMinigameComplete} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-emerald-100 flex flex-col items-center justify-center p-4 pt-20 pb-8">
      
      {/* Level Title Header Banner */}
      <div className="w-full max-w-xl text-center mb-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-300/80 bg-slate-900 px-3 py-1 rounded-full border border-emerald-800/40">
          {levelDef.scenario}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 mt-2">
          {levelDef.title}
        </h2>
        <p className="text-xs text-slate-300 font-serif italic mt-1">{levelDef.subtitle}</p>
      </div>

      {/* Intro Multi-Character Scene */}
      {phase === 'intro' && (
        <CharacterScene
          steps={getLevelIntroSceneSteps()}
          onSceneComplete={() => setPhase('playing')}
        />
      )}

      {/* Main Minigame */}
      {phase === 'playing' && renderMinigame()}

      {/* Outro Multi-Character Scene */}
      {phase === 'outro' && (
        <CharacterScene
          steps={getLevelOutroSceneSteps()}
          onSceneComplete={() => {
            soundEngine.playClick();
            onNavigateToMap();
          }}
        />
      )}
    </div>
  );
};
