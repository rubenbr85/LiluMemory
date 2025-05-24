import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchDifficultys } from '../services/difficultyService';
import { fetchSources } from '../services/sourceService';
import { Difficulty } from '../models/Difficulty';
import { CharacterSource } from '../models/CharacterSource';

interface GameMenuProps {
  onStartGame: (difficulty: Difficulty, source: CharacterSource) => void;
}

export const GameMenu = ({ onStartGame }: GameMenuProps) => {
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [sources, setSources] = useState<CharacterSource[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [selectedSource, setSelectedSource] = useState<CharacterSource | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [difficultyData, sourcesData] = await Promise.all([
          fetchDifficultys(),
          fetchSources()
        ]);
        setDifficulties(difficultyData);
        setSources(sourcesData);
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    };

    loadData();
  }, []);

  const handleStartGame = () => {
    if (selectedDifficulty && selectedSource) {
      onStartGame(selectedDifficulty, selectedSource);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <div className="text-4xl font-bold text-white mb-8">
        SELECT DIFFICULTY
      </div>
      
      <div className="flex gap-4">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.id}
            className={`px-8 py-4 rounded-full text-2xl font-bold shadow-lg transition-colors
              ${selectedDifficulty?.id === difficulty.id 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedDifficulty(difficulty)}
          >
            {difficulty.difficulty.toUpperCase()}
          </motion.button>
        ))}
      </div>

      <div className="text-4xl font-bold text-white mt-8 mb-8">
        SELECT CHARACTER
      </div>

      <div className="grid grid-cols-4 gap-4">
        {sources.map((source) => (
          <motion.button
            key={source.id}
            className={`p-4 rounded-full bg-white ${
              selectedSource?.id === source.id ? 'ring-4 ring-blue-500' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedSource(source)}
          >
            <img
              src={source.imageMenu}
              alt={source.nombre}
              className="w-16 h-16 rounded-full"
            />
          </motion.button>
        ))}
      </div>

      <motion.button
        className={`mt-8 px-16 py-4 text-2xl font-bold rounded-full shadow-lg ${
          selectedDifficulty && selectedSource
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={selectedDifficulty && selectedSource ? { scale: 1.05 } : {}}
        whileTap={selectedDifficulty && selectedSource ? { scale: 0.95 } : {}}
        onClick={handleStartGame}
        disabled={!selectedDifficulty || !selectedSource}
      >
        PLAY
      </motion.button>
    </div>
  );
};