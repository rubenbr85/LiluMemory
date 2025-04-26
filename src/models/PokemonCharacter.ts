import { Character } from './Character';

export class PokemonCharacter implements Character {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string,
    public types: string[],
    public abilities: string[]
  ) {}
} 