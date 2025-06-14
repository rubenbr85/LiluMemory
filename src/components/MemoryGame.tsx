import { useState, useEffect } from 'react';
import { Card } from './Card';
import { Character } from '../models/Character';
import { CardModel } from '../models/CardModel';
import './MemoryGame.css';

interface MemoryGameProps {
  characters: Character[];
}

export const MemoryGame = ({ characters }: MemoryGameProps) => {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [mismatchedCards, setMismatchedCards] = useState<number[]>([]);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    // Duplicar y mezclar las cartas
    const duplicatedCards = [...characters, ...characters].map((character, index) => ({
      id: index,
      idCharacter: character.id,
      name: character.name,
      imageUrl: character.imageUrl
    }));
    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
  }, [characters]);

  useEffect(() => {
    if (matchedPairs.length === cards.length && matchedPairs.length > 0) {
      setIsGameComplete(true);
    }
  }, [matchedPairs, cards.length]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      const firstCardData = cards.find(card => card.id === firstCard);
      const secondCardData = cards.find(card => card.id === secondCard);

      if (firstCardData?.idCharacter === secondCardData?.idCharacter) {
        setMatchedPairs([...matchedPairs, firstCard, secondCard]);
        setFlippedCards([]);
      } else {
        setMismatchedCards([firstCard, secondCard]);
        setTimeout(() => {
          setFlippedCards([]);
          setMismatchedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMismatchedCards([]);
    setIsGameComplete(false);
  };

  return (
    <div className="memory-game">
      <div className="game-board">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.name}
            imageUrl={card.imageUrl}
            isFlipped={flippedCards.includes(card.id)}
            isMatched={matchedPairs.includes(card.id)}
            isMismatched={mismatchedCards.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {isGameComplete && (
        <div className="game-complete">
          <h2>¡Felicidades! Has completado el juego</h2>
          <button onClick={resetGame}>Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
}; 