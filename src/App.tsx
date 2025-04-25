import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MemoryGame } from './components/MemoryGame'
import axios from 'axios'
import './App.css'

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        // Obtener un número aleatorio de Pokémon entre 4 y 15
        const numPokemons = Math.floor(Math.random() * (15 - 4 + 1)) + 4;
        
        // Obtener la lista de Pokémon
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${numPokemons}`);
        const pokemonList = response.data.results;

        // Obtener los detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (pokemon: { url: string }) => {
            const detailResponse = await axios.get(pokemon.url);
            return {
              id: detailResponse.data.id,
              name: detailResponse.data.name,
              imageUrl: detailResponse.data.sprites.front_default
            };
          })
        );

        setPokemons(pokemonDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Pokémon Memory Game</h1>
      </header>
      <main>
        {loading ? (
          <div className="loading">Cargando Pokémon...</div>
        ) : (
          <MemoryGame characters={pokemons} />
        )}
      </main>
    </div>
  )
}

export default App 