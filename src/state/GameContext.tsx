import React, { createContext, useContext, useState, useEffect } from 'react';
import type { GameState, RewardOption } from './types';
import { calculateUnlockedSliceCount } from '../data/rewards';
import { soundEngine } from '../audio/soundEngine';

const SAVE_KEY = 'el_sendero_de_mari_save_v1';

const defaultState: GameState = {
  currentLevel: 1,
  completedLevels: [],
  lifePoints: 500, // Starting bonus points
  experiences: [],
  secrets: [],
  dedications: [],
  unlockedWheelOptions: 3,
  discoveredPaths: [],
  charactersFound: ['manchas', 'negro'],
  obstaclesEncountered: 0,
  wheelResult: null,
  soundEnabled: true,
  reducedMotion: false
};

interface GameContextType {
  gameState: GameState;
  addLifePoints: (points: number, reason?: string) => void;
  deductLifePoints: (points: number, obstacleName?: string) => void;
  completeLevel: (levelId: number) => void;
  setCurrentLevel: (levelId: number) => void;
  unlockSecret: (secretId: string) => void;
  unlockDedication: (dedicationId: string) => void;
  unlockExperience: (experienceId: string) => void;
  setWheelResult: (reward: RewardOption) => void;
  resetGame: () => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load save state:', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.error('Failed to persist game state:', e);
    }
  }, [gameState]);

  const addLifePoints = (points: number, _reason?: string) => {
    soundEngine.playSparkle();
    setGameState(prev => {
      const newPoints = prev.lifePoints + points;
      return {
        ...prev,
        lifePoints: newPoints,
        unlockedWheelOptions: calculateUnlockedSliceCount(newPoints)
      };
    });
  };

  const deductLifePoints = (points: number, _obstacleName?: string) => {
    soundEngine.playObstacle();
    setGameState(prev => {
      const newPoints = Math.max(0, prev.lifePoints - points);
      return {
        ...prev,
        lifePoints: newPoints,
        obstaclesEncountered: prev.obstaclesEncountered + 1,
        unlockedWheelOptions: calculateUnlockedSliceCount(newPoints)
      };
    });
  };

  const completeLevel = (levelId: number) => {
    soundEngine.playSuccess();
    setGameState(prev => {
      const completed = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];
      
      const nextLevel = Math.min(10, Math.max(prev.currentLevel, levelId + 1));
      
      return {
        ...prev,
        completedLevels: completed,
        currentLevel: nextLevel
      };
    });
  };

  const setCurrentLevel = (levelId: number) => {
    setGameState(prev => ({ ...prev, currentLevel: levelId }));
  };

  const unlockSecret = (secretId: string) => {
    setGameState(prev => {
      if (prev.secrets.includes(secretId)) return prev;
      soundEngine.playSparkle();
      return {
        ...prev,
        secrets: [...prev.secrets, secretId],
        lifePoints: prev.lifePoints + 150
      };
    });
  };

  const unlockDedication = (dedicationId: string) => {
    setGameState(prev => {
      if (prev.dedications.includes(dedicationId)) return prev;
      return {
        ...prev,
        dedications: [...prev.dedications, dedicationId]
      };
    });
  };

  const unlockExperience = (experienceId: string) => {
    setGameState(prev => {
      if (prev.experiences.includes(experienceId)) return prev;
      return {
        ...prev,
        experiences: [...prev.experiences, experienceId]
      };
    });
  };

  const setWheelResult = (reward: RewardOption) => {
    setGameState(prev => ({ ...prev, wheelResult: reward }));
  };

  const resetGame = () => {
    localStorage.removeItem(SAVE_KEY);
    setGameState(defaultState);
  };

  const toggleSound = () => {
    const isMutedNow = soundEngine.toggleMute();
    setGameState(prev => ({ ...prev, soundEnabled: !isMutedNow }));
  };

  const toggleReducedMotion = () => {
    setGameState(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        addLifePoints,
        deductLifePoints,
        completeLevel,
        setCurrentLevel,
        unlockSecret,
        unlockDedication,
        unlockExperience,
        setWheelResult,
        resetGame,
        toggleSound,
        toggleReducedMotion
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
