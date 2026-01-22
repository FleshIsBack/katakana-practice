"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { katakanaData, KatakanaChar, KatakanaRow } from "./data/katakana";

type GameState = "selection" | "practice" | "complete";

export default function Home() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedChars, setSelectedChars] = useState<Set<string>>(new Set());
  const [gameState, setGameState] = useState<GameState>("selection");
  const [currentChars, setCurrentChars] = useState<KatakanaChar[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const toggleRow = (rowName: string) => {
    const row = katakanaData.find((r) => r.name === rowName);
    if (!row) return;

    const rowCharKeys = row.chars.map((c) => `${rowName}-${c.char}`);

    if (selectedRows.includes(rowName)) {
      // Deselecting row - remove all its characters
      setSelectedRows((prev) => prev.filter((r) => r !== rowName));
      setSelectedChars((prev) => {
        const newSet = new Set(prev);
        rowCharKeys.forEach((key) => newSet.delete(key));
        return newSet;
      });
    } else {
      // Selecting row - add all its characters
      setSelectedRows((prev) => [...prev, rowName]);
      setSelectedChars((prev) => {
        const newSet = new Set(prev);
        rowCharKeys.forEach((key) => newSet.add(key));
        return newSet;
      });
    }
  };

  const toggleChar = (rowName: string, char: KatakanaChar) => {
    const charKey = `${rowName}-${char.char}`;
    const row = katakanaData.find((r) => r.name === rowName);
    if (!row) return;

    setSelectedChars((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(charKey)) {
        newSet.delete(charKey);
      } else {
        newSet.add(charKey);
      }

      // Update row selection based on how many chars are selected
      const rowCharKeys = row.chars.map((c) => `${rowName}-${c.char}`);
      const selectedInRow = rowCharKeys.filter((key) => newSet.has(key)).length;

      if (selectedInRow === row.chars.length) {
        // All chars selected - mark row as selected
        if (!selectedRows.includes(rowName)) {
          setSelectedRows((prev) => [...prev, rowName]);
        }
      } else {
        // Not all chars selected - unmark row
        if (selectedRows.includes(rowName)) {
          setSelectedRows((prev) => prev.filter((r) => r !== rowName));
        }
      }

      return newSet;
    });
  };

  const selectAll = () => {
    setSelectedRows(katakanaData.map((row) => row.name));
    const allChars = new Set<string>();
    katakanaData.forEach((row) => {
      row.chars.forEach((char) => {
        allChars.add(`${row.name}-${char.char}`);
      });
    });
    setSelectedChars(allChars);
  };

  const clearAll = () => {
    setSelectedRows([]);
    setSelectedChars(new Set());
  };

  const startPractice = () => {
    if (selectedChars.size === 0) return;

    const chars: KatakanaChar[] = [];
    katakanaData.forEach((row) => {
      row.chars.forEach((char) => {
        if (selectedChars.has(`${row.name}-${char.char}`)) {
          chars.push(char);
        }
      });
    });

    setCurrentChars(shuffleArray(chars));
    setCurrentIndex(0);
    setScore({ correct: 0, total: 0 });
    setGameState("practice");
    setFeedback(null);
    setShowHint(false);
  };

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      if (!input.trim() || feedback) return;

      const currentChar = currentChars[currentIndex];
      const isCorrect = input.toLowerCase().trim() === currentChar.romaji.toLowerCase();

      setFeedback(isCorrect ? "correct" : "incorrect");
      setScore((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));

      setTimeout(() => {
        if (currentIndex < currentChars.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setInput("");
          setFeedback(null);
          setShowHint(false);
        } else {
          setGameState("complete");
        }
      }, 800);
    },
    [input, feedback, currentChars, currentIndex]
  );

  const resetGame = () => {
    setGameState("selection");
    setSelectedRows([]);
    setSelectedChars(new Set());
    setCurrentChars([]);
    setCurrentIndex(0);
    setInput("");
    setFeedback(null);
    setShowHint(false);
  };

  const restartWithSameRows = () => {
    startPractice();
  };

  useEffect(() => {
    if (gameState === "practice" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState, currentIndex]);

  const currentChar = currentChars[currentIndex];
  const progress = currentChars.length > 0 ? ((currentIndex + 1) / currentChars.length) * 100 : 0;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-900/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-light tracking-wider mb-2">
            <span className="text-red-500">カ</span>
            <span className="text-amber-500">タ</span>
            <span className="text-stone-300">カ</span>
            <span className="text-red-400">ナ</span>
          </h1>
          <p className="text-stone-500 tracking-[0.3em] uppercase text-sm">
            Katakana Practice
          </p>
        </header>

        {/* Selection Screen */}
        {gameState === "selection" && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl text-stone-400">Select Rows to Practice</h2>
              <div className="flex gap-3">
                <button
                  onClick={selectAll}
                  className="px-4 py-2 text-sm text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-600 rounded-lg transition-all"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-sm text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-600 rounded-lg transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {katakanaData.map((row: KatakanaRow) => {
                const rowCharKeys = row.chars.map((c) => `${row.name}-${c.char}`);
                const selectedCount = rowCharKeys.filter((key) => selectedChars.has(key)).length;
                const isFullySelected = selectedCount === row.chars.length;
                const isPartiallySelected = selectedCount > 0 && selectedCount < row.chars.length;

                return (
                  <div
                    key={row.name}
                    className={`relative p-4 rounded-xl border transition-all duration-300 ${isFullySelected
                        ? "border-red-500/50 bg-red-950/30"
                        : isPartiallySelected
                          ? "border-amber-500/50 bg-amber-950/20"
                          : "border-stone-800 bg-stone-900/30"
                      }`}
                  >
                    {/* Row header - clickable to select all in row */}
                    <button
                      onClick={() => toggleRow(row.name)}
                      className="w-full flex items-center justify-between mb-3 group"
                    >
                      <h3 className="text-stone-300 font-medium group-hover:text-stone-100 transition-colors">
                        {row.displayName}
                      </h3>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isFullySelected
                            ? "border-red-500 bg-red-500"
                            : isPartiallySelected
                              ? "border-amber-500 bg-amber-500"
                              : "border-stone-600 group-hover:border-stone-400"
                          }`}
                      >
                        {isFullySelected && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        {isPartiallySelected && (
                          <div className="w-2 h-2 bg-white rounded-sm" />
                        )}
                      </div>
                    </button>

                    {/* Individual character buttons */}
                    <div className="flex flex-wrap gap-2">
                      {row.chars.map((char) => {
                        const isSelected = selectedChars.has(`${row.name}-${char.char}`);
                        return (
                          <button
                            key={char.char}
                            onClick={() => toggleChar(row.name, char)}
                            className={`w-10 h-10 rounded-lg border text-xl flex items-center justify-center transition-all ${isSelected
                                ? "border-red-500/70 bg-red-900/40 text-red-300 hover:bg-red-900/60"
                                : "border-stone-700 bg-stone-800/50 text-stone-500 hover:border-stone-500 hover:text-stone-300"
                              }`}
                            title={char.romaji}
                          >
                            {char.char}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={startPractice}
                disabled={selectedChars.size === 0}
                className={`px-8 py-4 rounded-xl text-lg tracking-wider transition-all duration-300 ${selectedChars.size > 0
                    ? "bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-lg shadow-red-900/30"
                    : "bg-stone-800 text-stone-500 cursor-not-allowed"
                  }`}
              >
                Start Practice
                {selectedChars.size > 0 && (
                  <span className="ml-2 text-sm opacity-75">
                    ({selectedChars.size} character{selectedChars.size !== 1 ? "s" : ""})
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Practice Screen */}
        {gameState === "practice" && currentChar && (
          <div className="animate-fadeIn">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-stone-500 mb-2">
                <span>
                  Progress: {currentIndex + 1} / {currentChars.length}
                </span>
                <span>
                  Score: {score.correct} / {score.total}
                </span>
              </div>
              <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Character display */}
            <div className="text-center mb-8">
              <div
                className={`inline-block p-8 rounded-2xl border transition-all duration-300 ${feedback === "correct"
                    ? "border-green-500/50 bg-green-950/20"
                    : feedback === "incorrect"
                      ? "border-red-500/50 bg-red-950/20"
                      : "border-stone-700 bg-stone-900/50"
                  }`}
              >
                <span
                  className={`text-[10rem] leading-none font-light transition-colors ${feedback === "correct"
                      ? "text-green-400"
                      : feedback === "incorrect"
                        ? "text-red-400"
                        : "text-stone-100"
                    }`}
                >
                  {currentChar.char}
                </span>
              </div>
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type the romaji..."
                  disabled={feedback !== null}
                  autoComplete="off"
                  autoCapitalize="off"
                  className={`w-full px-6 py-4 text-xl text-center bg-stone-900/50 border rounded-xl outline-none transition-all ${feedback === "correct"
                      ? "border-green-500/50 text-green-400"
                      : feedback === "incorrect"
                        ? "border-red-500/50 text-red-400"
                        : "border-stone-700 focus:border-amber-500/50 text-stone-100"
                    }`}
                />
                {feedback === "incorrect" && (
                  <div className="absolute -bottom-8 left-0 right-0 text-center text-red-400 text-sm">
                    Correct answer: <span className="font-bold">{currentChar.romaji}</span>
                  </div>
                )}
              </div>
            </form>

            {/* Hint button */}
            <div className="text-center mb-8 h-8">
              {!feedback && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-stone-500 hover:text-stone-300 text-sm transition-colors"
                >
                  {showHint ? (
                    <span>
                      Hint: starts with &quot;<span className="text-amber-400">{currentChar.romaji[0]}</span>&quot;
                    </span>
                  ) : (
                    "Show hint"
                  )}
                </button>
              )}
            </div>

            {/* Back button */}
            <div className="text-center">
              <button
                onClick={resetGame}
                className="px-6 py-2 text-stone-500 hover:text-stone-300 border border-stone-800 hover:border-stone-600 rounded-lg transition-all"
              >
                ← Back to Selection
              </button>
            </div>
          </div>
        )}

        {/* Complete Screen */}
        {gameState === "complete" && (
          <div className="animate-fadeIn text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">
                {score.correct === score.total ? "🎉" : score.correct >= score.total * 0.8 ? "👏" : "💪"}
              </div>
              <h2 className="text-3xl text-stone-200 mb-2">Practice Complete!</h2>
              <p className="text-stone-500">Great job practicing katakana</p>
            </div>

            <div className="inline-block p-8 rounded-2xl border border-stone-700 bg-stone-900/50 mb-8">
              <div className="text-5xl font-light mb-2">
                <span className="text-green-400">{score.correct}</span>
                <span className="text-stone-500"> / </span>
                <span className="text-stone-300">{score.total}</span>
              </div>
              <p className="text-stone-500">
                {Math.round((score.correct / score.total) * 100)}% Accuracy
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartWithSameRows}
                className="px-8 py-4 rounded-xl text-lg tracking-wider bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white transition-all"
              >
                Practice Again
              </button>
              <button
                onClick={resetGame}
                className="px-8 py-4 rounded-xl text-lg tracking-wider border border-stone-700 hover:border-stone-500 text-stone-300 transition-all"
              >
                Choose Different Rows
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-4 text-center text-stone-600 text-sm">
        Press Enter to submit • Type romaji for each character
      </footer>
    </main>
  );
}