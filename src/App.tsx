import React, { useState } from 'react'
import { MemoryGame } from './components/MemoryGame'
import { GameMenu } from './components/GameMenu'
import './App.css'
import { fetchCharacters } from './services/characterService'
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
      const data = await fetchCharacters(source);
      // TODO: Aplicar la dificultad para limitar el número de caracteres
      setCharacters(data.slice(0, difficulty.numberCharacter));
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
    <div className="app">
      <header className="app-header">
        <h1>Lilu Memory</h1>
        {gameStarted && (
          <button 
            className="restart-button"
            onClick={handleRestartGame}
          >
            Volver al Menú
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