import axios from 'axios';

export interface DisneyCharacter {
  id: number;
  name: string;
  imageUrl: string;
}

export const fetchDisneyCharacters = async (limit: number): Promise<DisneyCharacter[]> => {
  try {
    const response = await axios.get(`https://api.disneyapi.dev/character`);
    const allCharacters = response.data.data.map((character: any) => ({
      id: character._id,
      name: character.name,
      imageUrl: character.imageUrl || 'https://via.placeholder.com/150?text=Disney'
    }));

    // Mezclar el array de personajes de forma aleatoria
    const shuffled = allCharacters.sort(() => 0.5 - Math.random());
    // Seleccionar solo los primeros 'limit' elementos
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error fetching Disney characters:', error);
    // Si hay un error, devolvemos algunos personajes de Disney por defecto
    const defaultCharacters = [
      { id: 1, name: 'Mickey Mouse', imageUrl: 'https://via.placeholder.com/150?text=Mickey' },
      { id: 2, name: 'Minnie Mouse', imageUrl: 'https://via.placeholder.com/150?text=Minnie' },
      { id: 3, name: 'Donald Duck', imageUrl: 'https://via.placeholder.com/150?text=Donald' },
      { id: 4, name: 'Goofy', imageUrl: 'https://via.placeholder.com/150?text=Goofy' }
    ];
    // También limitamos los personajes por defecto
    return defaultCharacters.slice(0, limit);
  }
}; 