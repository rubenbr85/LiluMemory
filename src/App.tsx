import React, { useState } from 'react'
import { MemoryGame } from './components/MemoryGame'
import { GameMenu } from './components/GameMenu'
import './App.css'
import { fetchCharacters } from './services/characterGameService'
import { Character } from './models/Character'
import { CharacterSource } from './models/CharacterSource'
import { Difficulty } from './models/Difficulty'

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStartGame = async (difficulty: Difficulty, source: CharacterSource) => {
    setLoading(true);
    try {
      const data = await fetchCharacters(source.id, difficulty.id);
      setCharacters(data);
      setGameStarted(true);
    } catch (error) {
      console.error('Error loading characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestartGame = () => {
    setGameStarted(false);
    setCharacters([]);
  };

  return (
    <div className="app">      <header className="app-header">
        <h1>Lilu Memory</h1>
        {gameStarted && (
          <button 
            className="restart-button"
            onClick={handleRestartGame}
            title="Volver al Menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h18M3 6h18M3 18h18"/>
            </svg>
          </button>
        )}
      </header>
      <main>
        {loading ? (
          <div className="loading">Cargando personajes...</div>
        ) : gameStarted ? (
          <MemoryGame characters={characters} />
        ) : (
          <GameMenu onStartGame={handleStartGame} />
        )}
      </main>
    </div>
  )
}

export default App