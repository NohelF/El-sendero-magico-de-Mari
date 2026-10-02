import React, { useState } from 'react';
import { useGame } from '../state/GameContext';
import { soundEngine } from '../audio/soundEngine';
import { CheckCircle2, Compass, Heart } from 'lucide-react';

interface MinigameProps {
  onComplete: () => void;
}

interface TargetWord {
  id: string;
  word: string;
  start: [number, number]; // [row, col]
  end: [number, number];   // [row, col]
  color: string;
  found: boolean;
}

// 8x8 Word Search Grid
const GRID = [
  ['M', 'A', 'N', 'C', 'H', 'A', 'S', 'L'],
  ['S', 'E', 'N', 'D', 'E', 'R', 'O', 'U'],
  ['N', 'E', 'G', 'R', 'O', 'F', 'L', 'Z'],
  ['M', 'A', 'G', 'I', 'A', 'B', 'R', 'I'],
  ['L', 'U', 'M', 'A', 'R', 'I', 'Z', 'A'],
  ['F', 'L', 'O', 'R', 'E', 'S', 'O', 'L'],
  ['C', 'I', 'E', 'L', 'O', 'A', 'M', 'O'],
  ['V', 'I', 'D', 'A', 'P', 'A', 'Z', 'R']
];

const INITIAL_WORDS: TargetWord[] = [
  { id: 'mari', word: 'MARI', start: [4, 2], end: [4, 5], color: 'bg-emerald-500/40 border-emerald-400 text-emerald-200', found: false },
  { id: 'manchas', word: 'MANCHAS', start: [0, 0], end: [0, 6], color: 'bg-amber-500/40 border-amber-400 text-amber-200', found: false },
  { id: 'negro', word: 'NEGRO', start: [2, 0], end: [2, 4], color: 'bg-indigo-500/40 border-indigo-400 text-indigo-200', found: false },
  { id: 'sendero', word: 'SENDERO', start: [1, 0], end: [1, 6], color: 'bg-teal-500/40 border-teal-400 text-teal-200', found: false },
  { id: 'magia', word: 'MAGIA', start: [3, 0], end: [3, 4], color: 'bg-purple-500/40 border-purple-400 text-purple-200', found: false }
];

export const Level9_StormValley: React.FC<MinigameProps> = ({ onComplete }) => {
  const { addLifePoints, unlockDedication, unlockExperience } = useGame();

  const [words, setWords] = useState<TargetWord[]>(INITIAL_WORDS);
  const [selectedCells, setSelectedCells] = useState<[number, number][]>([]);
  const [feedback, setFeedback] = useState<string>('Toca la primera y la última letra de una palabra, o selecciónala en orden.');
  const [isDone, setIsDone] = useState(false);

  // Check if cell is in a found word
  const getFoundWordColor = (r: number, c: number): string | null => {
    for (const w of words) {
      if (!w.found) continue;
      const [startR, startC] = w.start;
      const [endR, endC] = w.end;

      if (startR === endR && r === startR && c >= Math.min(startC, endC) && c <= Math.max(startC, endC)) {
        return w.color;
      }
    }
    return null;
  };

  const handleCellClick = (r: number, c: number) => {
    if (isDone) return;
    soundEngine.playClick();

    const newSelection: [number, number][] = [...selectedCells, [r, c]];

    if (newSelection.length === 1) {
      setSelectedCells(newSelection);
      setFeedback(`Seleccionaste: ${GRID[r][c]}. Ahora toca la última letra de la palabra.`);
      return;
    }

    // Try matching with first and current cell
    const [firstR, firstC] = newSelection[0];
    const [lastR, lastC] = [r, c];

    // Check if this pair matches any word
    let matchedWordId: string | null = null;
    for (const w of words) {
      if (w.found) continue;
      const [wStartR, wStartC] = w.start;
      const [wEndR, wEndC] = w.end;

      // Normal or reverse order
      const directMatch = firstR === wStartR && firstC === wStartC && lastR === wEndR && lastC === wEndC;
      const reverseMatch = firstR === wEndR && firstC === wEndC && lastR === wStartR && lastC === wStartC;

      if (directMatch || reverseMatch) {
        matchedWordId = w.id;
        break;
      }
    }

    if (matchedWordId) {
      soundEngine.playSparkle();
      const target = words.find(w => w.id === matchedWordId);
      setFeedback(`¡Excelente! Encontraste: ${target?.word} ✨`);

      const updatedWords = words.map(w =>
        w.id === matchedWordId ? { ...w, found: true } : w
      );
      setWords(updatedWords);
      setSelectedCells([]);

      const totalFound = updatedWords.filter(w => w.found).length;
      addLifePoints(30, `🔎 +30 Exploración: ¡Palabra ${target?.word} encontrada!`);

      if (totalFound === words.length) {
        soundEngine.playSuccess();
        unlockDedication('dedication_resilience');
        unlockExperience('exp_wisdom');
        addLifePoints(100, '🔎 +100 Exploración: ¡Sopa de Letras Mágica Completa!');
        setIsDone(true);
      }
    } else {
      // Just keep this cell as the new start
      setSelectedCells([[r, c]]);
      setFeedback(`Seleccionaste: ${GRID[r][c]}. Toca la última letra de la palabra.`);
    }
  };

  const handleWordHint = (word: TargetWord) => {
    if (word.found || isDone) return;
    soundEngine.playClick();
    setFeedback(`Pista para "${word.word}": Comienza en la fila ${word.start[0] + 1}, columna ${word.start[1] + 1}.`);
  };

  const foundCount = words.filter(w => w.found).length;

  return (
    <div className="w-full max-w-xl mx-auto p-5 sm:p-6 bg-slate-900/80 border border-emerald-600/40 rounded-3xl shadow-2xl backdrop-blur-md text-emerald-100 flex flex-col gap-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700/60 text-center space-y-1">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/assets/characters/cuervo_de_la_duda.png"
            alt="Cuervo de la Duda"
            className="w-12 h-12 object-contain drop-shadow"
          />
          <div>
            <h3 className="font-serif font-bold text-slate-200 text-lg sm:text-xl flex items-center justify-center gap-1.5">
              <span>El Valle de las Tormentas</span>
            </h3>
            <p className="text-xs text-slate-400 font-serif italic">
              Escucha la voz de la duda y descubre las palabras que disipan la niebla
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-1 font-mono text-xs text-amber-300">
          <span>Palabras encontradas: {foundCount} / 5</span>
        </div>
      </div>

      {/* Word List Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {words.map(w => (
          <button
            key={w.id}
            onClick={() => handleWordHint(w)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-serif font-bold transition-all ${
              w.found
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 line-through opacity-75'
                : 'bg-slate-800/80 hover:bg-slate-700/80 border-emerald-800/60 text-slate-200'
            }`}
          >
            {w.found ? '✓ ' : ''}{w.word}
          </button>
        ))}
      </div>

      {/* Feedback banner */}
      <div className="h-6 flex items-center justify-center">
        <span className="text-xs font-serif text-emerald-300 italic text-center px-2">
          {feedback}
        </span>
      </div>

      {/* 8x8 Grid */}
      <div className="flex justify-center py-1">
        <div className="p-2.5 rounded-2xl bg-slate-950/90 border border-emerald-700 shadow-xl grid grid-cols-8 gap-1 select-none">
          {GRID.map((row, r) =>
            row.map((letter, c) => {
              const foundColor = getFoundWordColor(r, c);
              const isSelected = selectedCells.some(([sr, sc]) => sr === r && sc === c);

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => handleCellClick(r, c)}
                  disabled={isDone}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold font-mono transition-all ${
                    foundColor
                      ? `${foundColor} border shadow-[0_0_8px_rgba(16,185,129,0.3)]`
                      : isSelected
                      ? 'bg-amber-400 text-slate-950 scale-110 shadow-lg font-extrabold'
                      : 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60 text-slate-300 active:scale-95'
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Victory Screen */}
      {isDone && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border border-amber-400 text-center space-y-3 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
            <h4 className="font-serif font-bold text-amber-200 text-base">
              ¡Todas las palabras mágicas encontradas!
            </h4>
          </div>

          <div className="flex items-center justify-center gap-4 py-1">
            <div className="flex items-center gap-1 text-xs text-rose-300 font-serif">
              <Heart className="w-4 h-4 fill-rose-500/30 text-rose-400" />
              <span>+75 Felicidad</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-teal-300 font-serif">
              <Compass className="w-4 h-4 text-teal-400" />
              <span>+75 Exploración</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/40 inline-block">
            💌 Dedicatoria de Resiliencia Desbloqueada
          </div>

          <p className="text-xs text-slate-300 italic font-serif">
            "Las palabras guardan la memoria del viaje. Al nombrarlas, iluminas el sendero entero."
          </p>

          <button
            onClick={onComplete}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-serif font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-98"
          >
            Avanzar al Mirador Final →
          </button>
        </div>
      )}
    </div>
  );
};
