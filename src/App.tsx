import React, { useState } from 'react';
import { GameProvider, useGame } from './state/GameContext';
import { StartScreen } from './components/screens/StartScreen';
import { LivingMap } from './components/map/LivingMap';
import { LevelScreen } from './components/screens/LevelScreen';
import { JourneyStats } from './components/wheel/JourneyStats';
import { WheelOf33 } from './components/wheel/WheelOf33';
import { TopBar } from './components/ui/TopBar';
import { GameMenu } from './components/menu/GameMenu';

type ScreenState = 'start' | 'map' | 'level' | 'stats' | 'wheel';

const AppContent: React.FC = () => {
  const { setCurrentLevel } = useGame();
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('start');
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    setCurrentLevel(levelId);
    setCurrentScreen('level');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative font-sans overflow-x-hidden">
      {/* Top Header Bar (Shown when not on start screen) */}
      {currentScreen !== 'start' && (
        <TopBar onOpenMenu={() => setIsMenuOpen(true)} />
      )}

      {/* Screen Router */}
      {currentScreen === 'start' && (
        <StartScreen onStart={() => setCurrentScreen('map')} />
      )}

      {currentScreen === 'map' && (
        <LivingMap
          onSelectLevel={handleSelectLevel}
          onOpenWheel={() => setCurrentScreen('wheel')}
        />
      )}

      {currentScreen === 'level' && (
        <LevelScreen
          levelId={activeLevelId}
          onNavigateToMap={() => setCurrentScreen('map')}
          onNavigateToStats={() => setCurrentScreen('stats')}
        />
      )}

      {currentScreen === 'stats' && (
        <div className="min-h-screen w-full flex items-center justify-center p-4 pt-20 pb-8 bg-slate-950">
          <JourneyStats onContinueToWheel={() => setCurrentScreen('wheel')} />
        </div>
      )}

      {currentScreen === 'wheel' && (
        <div className="min-h-screen w-full flex items-center justify-center p-4 pt-20 pb-8 bg-slate-950">
          <WheelOf33 />
        </div>
      )}

      {/* Menu Modal */}
      {isMenuOpen && (
        <GameMenu
          onClose={() => setIsMenuOpen(false)}
          onNavigateToMap={() => setCurrentScreen('map')}
          onOpenWheel={() => setCurrentScreen('wheel')}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
