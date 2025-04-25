export const SOURCES = {
  DISNEY: 'disney',
  POKEMON: 'pokemon'
} as const;

export type SourceType = typeof SOURCES[keyof typeof SOURCES];

export const DEFAULT_SOURCE = SOURCES.DISNEY; 