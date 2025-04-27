import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MemoryGame } from './components/MemoryGame'
import './App.css'
import { SOURCES, DEFAULT_SOURCE } from './constants/sources'
import { fetchCharacters } from './services/characterService'
import { Character } from './models/Character'
import { CharacterSource } from './models/CharacterSource'

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<CharacterSource>(DEFAULT_SOURCE);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(source);
        setCharacters(data);
      } catch (error) {
        console.error('Error loading characters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
  }, [source]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lilu Memory</h1>
        <div className="source-selector" ref={dropdownRef}>
          <button 
            className="source-selector-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img src={source.imageMenu} alt={source.nombre} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                className="dropdown-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {SOURCES.map((sourceOption) => (
                  <button
                    key={sourceOption.id}
                    className={`dropdown-item ${source.id === sourceOption.id ? 'active' : ''}`}
                    onClick={() => {
                      setSource(sourceOption);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <img src={sourceOption.imageMenu} alt={sourceOption.nombre} />
                    <span>{sourceOption.nombre}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      <main>
        {loading ? (
          <div className="loading">Cargando personajes...</div>
        ) : (
          <MemoryGame characters={characters} />
        )}
      </main>
    </div>
  )
}

export default App 