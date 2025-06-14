export interface CardProps {
  id: number;
  name: string;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  isMismatched: boolean;
  onClick: () => void;
} 