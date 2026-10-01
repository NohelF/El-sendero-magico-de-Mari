import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useGame } from '../../state/GameContext';
import { REWARDS } from '../../data/rewards';
import type { RewardOption } from '../../state/types';
import { soundEngine } from '../../audio/soundEngine';
import { Sparkles, Trophy, RotateCw } from 'lucide-react';

export const WheelOf33: React.FC = () => {
  const { gameState, setWheelResult } = useGame();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonReward, setWonReward] = useState<RewardOption | null>(gameState.wheelResult);

  // Filter rewards available according to unlockedWheelOptions count
  const activeRewards = REWARDS.slice(0, gameState.unlockedWheelOptions);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundEngine.playSparkle();

    const selectedIndex = Math.floor(Math.random() * activeRewards.length);
    const sliceAngle = 360 / activeRewards.length;
    
    // Add 5 full rotations + offset for winning slice
    const totalExtraRotations = 360 * 5;
    const targetDegree = totalExtraRotations + (360 - (selectedIndex * sliceAngle + sliceAngle / 2));

    setRotation(targetDegree);

    // Play tick sound periodically
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      soundEngine.playWheelTick();
      tickCount++;
      if (tickCount > 25) clearInterval(tickInterval);
    }, 120);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      const winner = activeRewards[selectedIndex];
      setWonReward(winner);
      setWheelResult(winner);
      soundEngine.playSuccess();

      // Launch Confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3500);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-slate-900/90 border border-amber-500/50 rounded-3xl shadow-2xl backdrop-blur-xl text-emerald-100 flex flex-col items-center gap-6 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 border border-amber-500/50 text-amber-300 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>RECOMPENSA FINAL DEL SENDERO</span>
        </div>
        <h2 className="font-serif font-bold text-amber-200 text-2xl sm:text-3xl">
          🎰 LA RUEDA DE LOS 33
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto font-serif italic">
          Gira la rueda para desvelar una sorpresa o actividad especial para celebrar todo tu recorrido.
        </p>
      </div>

      {/* Visual Wheel Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-2">
        {/* Pointer Arrow */}
        <div className="absolute -top-3 z-30 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]" />

        {/* Outer Wheel Ring */}
        <div className="w-full h-full rounded-full border-4 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.3)] bg-slate-950 p-2 overflow-hidden flex items-center justify-center">
          
          {/* Rotating Canvas / SVG Disc */}
          <div
            className="w-full h-full rounded-full relative transition-transform duration-[3500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {activeRewards.map((reward, idx) => {
              const sliceAngle = 360 / activeRewards.length;
              const angle = idx * sliceAngle;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={reward.id}
                  className="absolute inset-0 origin-center flex items-center justify-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="w-full h-full absolute top-0 left-0"
                    style={{
                      clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((Math.PI * sliceAngle) / 180)}% ${
                        50 - 50 * Math.sin((Math.PI * sliceAngle) / 180)
                      }%, 100% 0, 50% 0)`,
                      backgroundColor: isEven ? '#1e293b' : '#064e3b'
                    }}
                  />
                  <div
                    className="absolute z-10 text-center font-serif text-[11px] sm:text-xs font-bold text-amber-200"
                    style={{
                      transform: `rotate(${sliceAngle / 2}deg) translateY(-100px)`
                    }}
                  >
                    <span>{reward.icon}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Hub Button */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={`absolute z-20 w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 border-4 border-amber-200 text-slate-950 font-serif font-extrabold text-sm shadow-xl flex flex-col items-center justify-center transition-all ${
              isSpinning ? 'opacity-80 scale-95 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            <RotateCw className={`w-5 h-5 mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>GIRAR</span>
          </button>
        </div>
      </div>

      {/* Won Reward Popup */}
      {wonReward && (
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-emerald-950/80 to-amber-950/80 border border-amber-400 text-center space-y-2 animate-fadeIn shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-2xl">
            <span>🎉</span>
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>{wonReward.icon}</span>
          </div>
          <h3 className="font-serif font-bold text-amber-200 text-lg">
            ¡Recompensa Desvelada!
          </h3>
          <h4 className="font-serif font-bold text-emerald-300 text-base">{wonReward.title}</h4>
          <p className="text-xs text-slate-200 leading-relaxed font-serif italic">
            "{wonReward.description}"
          </p>
        </div>
      )}
    </div>
  );
};
