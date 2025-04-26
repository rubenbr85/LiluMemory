import { useState } from 'react';
import { CardProps } from '../models/CardProps';
import './Card.css';

export const Card = ({ id, name, imageUrl, isFlipped, isMatched, onClick }: CardProps) => {
  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="card-back">
          <div className="card-back-content">?</div>
        </div>
      </div>
    </div>
  );
}; 