import React, { useState } from 'react';
import { useGame } from '../../state/GameContext';
import { DEDICATIONS } from '../../data/dedications';
import { SECRETS } from '../../data/secrets';
import { EXPERIENCES } from '../../data/experiences';
import { soundEngine } from '../../audio/soundEngine';
import { X, Map, Sparkles, Heart, Compass, Shield, Settings, RotateCcw, Volume2, VolumeX, Eye } from 'lucide-react';

interface GameMenuProps {
  onClose: () => void;
  onNavigateToMap: () => void;
  onOpenWheel: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onClose, onNavigateToMap, onOpenWheel }) => {
  const { gameState, resetGame, toggleSound, toggleReducedMotion } = useGame();
  const [activeTab, setActiveTab] = useState<'map' | 'dedications' | 'experiences' | 'secrets' | 'settings'>('map');
  const [confirmReset, setConfirmReset] = useState(false);

  const unlockedDedications = DEDICATIONS.filter(d => gameState.dedications.includes(d.id));
  const unlockedExperiences = EXPERIENCES.filter(e => gameState.experiences.includes(e.id));
  const unlockedSecrets = SECRETS.filter(s => gameState.secrets.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-2xl h-[85vh] bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 border border-emerald-600/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-emerald-100">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-800/40 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h2 className="font-serif text-lg font-bold tracking-wide text-emerald-200">Menú del Sendero</h2>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 transition-all"
            aria-label="Cerrar Menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-900/40 bg-slate-950/50 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('map'); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all shrink-0 ${
              activeTab === 'map'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-900/20 font-bold'
                : 'border-transparent text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Navegación</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('dedications'); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all shrink-0 ${
              activeTab === 'dedications'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-900/20 font-bold'
                : 'border-transparent text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Dedicatorias ({unlockedDedications.length})</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('experiences'); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all shrink-0 ${
              activeTab === 'experiences'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-900/20 font-bold'
                : 'border-transparent text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Experiencias ({unlockedExperiences.length})</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('secrets'); }}
            className={`flex-1 py-3 px-3 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all shrink-0 ${
              activeTab === 'secrets'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-900/20 font-bold'
                : 'border-transparent text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Compass className="w-4 h-4 text-purple-400" />
            <span>Secretos ({unlockedSecrets.length})</span>
          </button>

          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('settings'); }}
            className={`py-3 px-4 text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all shrink-0 ${
              activeTab === 'settings'
                ? 'border-emerald-400 text-emerald-300 bg-emerald-900/20 font-bold'
                : 'border-transparent text-slate-400 hover:text-emerald-200'
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          {activeTab === 'map' && (
            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-2xl bg-emerald-900/20 border border-emerald-700/40 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-amber-200 text-lg">Puntos de Vida Acumulados</h4>
                  <p className="text-xs text-slate-300 mt-1">Suma simbólica de lo encontrado durante tu viaje.</p>
                </div>
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xl">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  <span>{gameState.lifePoints}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onNavigateToMap();
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 border border-emerald-500/40 flex items-center gap-3 font-serif font-bold text-white text-left transition-all active:scale-98"
                >
                  <Map className="w-6 h-6 text-emerald-300" />
                  <div>
                    <div>🗺️ Ver Mapa Vivo</div>
                    <div className="text-xs font-sans font-normal text-emerald-200/80">Seleccionar o revisar niveles</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenWheel();
                    onClose();
                  }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 border border-amber-500/40 flex items-center gap-3 font-serif font-bold text-amber-100 text-left transition-all active:scale-98"
                >
                  <span className="text-2xl">🎰</span>
                  <div>
                    <div>Rueda de los 33</div>
                    <div className="text-xs font-sans font-normal text-amber-200/80">
                      {gameState.unlockedWheelOptions} opciones desveladas
                    </div>
                  </div>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-emerald-300">Resumen del Estado actual:</div>
                <div>• Niveles completados: <span className="text-amber-200">{gameState.completedLevels.length} / 10</span></div>
                <div>• Obstáculos superados: <span className="text-amber-200">{gameState.obstaclesEncountered}</span></div>
                <div>• Nivel actual alcanzado: <span className="text-amber-200">Nivel {gameState.currentLevel}</span></div>
              </div>
            </div>
          )}

          {activeTab === 'dedications' && (
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-bold text-amber-200 text-base">Dedicatorias Desbloqueadas</h4>
              {unlockedDedications.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm italic">
                  Avanza en el sendero para desvelar dedicatorias especiales de familia, amigos y amor.
                </div>
              ) : (
                <div className="space-y-4">
                  {unlockedDedications.map(d => (
                    <div key={d.id} className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-emerald-300">{d.title}</span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700/40">
                          {d.category}
                        </span>
                      </div>
                      <p className="text-sm font-serif italic text-slate-200">{d.content}</p>
                      {d.placeholderPhoto && (
                        <div className="text-[11px] font-mono text-emerald-400/70 bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center gap-2">
                          <span>📷 Placeholder Foto:</span>
                          <span className="text-amber-300">{d.placeholderPhoto}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'experiences' && (
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-bold text-amber-200 text-base">Fragmentos de Experiencia (🔮)</h4>
              {unlockedExperiences.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm italic">
                  Los fragmentos de experiencia se recogen al superar obstáculos e incertidumbres en el camino.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {unlockedExperiences.map(e => (
                    <div key={e.id} className="p-4 rounded-2xl bg-slate-900/80 border border-amber-600/30 flex items-start gap-3">
                      <span className="text-2xl">{e.icon}</span>
                      <div>
                        <h5 className="font-serif font-bold text-amber-300 text-sm">{e.title}</h5>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{e.description}</p>
                        <span className="text-[10px] text-slate-400 mt-2 block italic">
                          Obtenido al superar: {e.unlockedAtObstacle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'secrets' && (
            <div className="flex flex-col gap-4">
              <h4 className="font-serif font-bold text-amber-200 text-base">Secretos del Sendero (🌟)</h4>
              {unlockedSecrets.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm italic">
                  Explora activamente cada nivel y conversa con Zafiro y Negro para descubrir senderos ocultos.
                </div>
              ) : (
                <div className="space-y-3">
                  {unlockedSecrets.map(s => (
                    <div key={s.id} className="p-4 rounded-2xl bg-slate-900/80 border border-purple-600/30 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-purple-300">{s.name}</span>
                        <span className="text-xs text-amber-300 font-bold">+{s.rewardPoints} Pts</span>
                      </div>
                      <p className="text-xs text-slate-300">{s.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex flex-col gap-5">
              <h4 className="font-serif font-bold text-amber-200 text-base">Configuración del Juego</h4>
              
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {gameState.soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
                  <div>
                    <div className="font-medium text-sm text-emerald-200">Música y Sonido</div>
                    <div className="text-xs text-slate-400">Activar o silenciar ambientación sonoras y efectos</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSound()}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    gameState.soundEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {gameState.soundEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-medium text-sm text-emerald-200">Reducción de Movimiento</div>
                    <div className="text-xs text-slate-400">Minimiza efectos y animaciones intensas</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleReducedMotion()}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                    gameState.reducedMotion ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {gameState.reducedMotion ? 'ACTIVADO' : 'DESACTIVADO'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reiniciar Viaje (Nuevo Viaje)</span>
                </div>
                <p className="text-xs text-slate-300">
                  Reiniciar borrará todo el progreso guardado y comenzará la aventura desde el Nivel 1.
                </p>

                {!confirmReset ? (
                  <button
                    onClick={() => setConfirmReset(true)}
                    className="w-full py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-xs font-bold transition-all"
                  >
                    Borrar Progreso e Iniciar Nuevo Viaje
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        resetGame();
                        setConfirmReset(false);
                        onClose();
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                    >
                      Sí, Confirmar Reinicio
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-emerald-900/40 bg-slate-900/80 flex items-center justify-center">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm tracking-wide transition-all shadow-md"
          >
            ▶ Reanudar Viaje
          </button>
        </div>
      </div>
    </div>
  );
};
