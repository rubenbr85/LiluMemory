import { Character } from '../models/Character';
import axios from 'axios';

const CHARACTERS_LIMIT = 5;
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchCharacters = async (sourceId: number, difficultyId: number): Promise<Character[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/characters?sourceId=${sourceId}&limit=${CHARACTERS_LIMIT}&difficultyId=${difficultyId}`,
      {
        headers: {
          'x-api-key': import.meta.env.VITE_API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};