import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MemoryGame } from './components/MemoryGame'
import './App.css'
import { fetchSources } from './services/sourceService'
import { fetchCharacters } from './services/characterService'
import { Character } from './models/Character'
import { CharacterSource } from './models/CharacterSource'

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [sources, setSources] = useState<CharacterSource[]>([]);
  const [source, setSource] = useState<CharacterSource | null>(null);
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
    const loadSources = async () => {
      try {
        const fetchedSources = await fetchSources();
        setSources(fetchedSources);
        setSource(fetchedSources[0] || null);
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };

    loadSources();
  }, []);

  useEffect(() => {
    const loadCharacters = async () => {
      if (source) {
        setLoading(true);
        try {
          const data = await fetchCharacters(source);
          setCharacters(data);
        } catch (error) {
          console.error('Error loading characters:', error);
        } finally {
          setLoading(false);
        }
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
            {source && <img src={source.imageMenu} alt={source.nombre} />}
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
                {sources.map((sourceOption) => (
                  <button
                    key={sourceOption.id}
                    className={`dropdown-item ${source?.id === sourceOption.id ? 'active' : ''}`}
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