import axios from 'axios';
import { CharacterSource } from '../models/CharacterSource';

const API_URL = `${import.meta.env.VITE_API_URL}/api/sources`;


export const fetchSources = async (): Promise<CharacterSource[]> => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sources:', error);
    throw error;
  }
};