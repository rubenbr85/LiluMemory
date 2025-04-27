import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOURCES } from '../constants/sources';
import { CharacterSource } from '../models/CharacterSource';

interface SourceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSource: CharacterSource;
  onSourceChange: (source: CharacterSource) => void;
}

export const SourceSelectorModal: React.FC<SourceSelectorModalProps> = ({
  isOpen,
  onClose,
  currentSource,
  onSourceChange,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="modal-content"
          >
            <h2>Seleccionar Fuente</h2>
            <div className="source-options">
              {SOURCES.map((source) => (
                <button
                  key={source.id}
                  className={`source-option ${currentSource.id === source.id ? 'active' : ''}`}
                  onClick={() => {
                    onSourceChange(source);
                    onClose();
                  }}
                >
                  <img
                    src={source.imageMenu}
                    alt={source.nombre}
                    onError={e => {
                      (e.currentTarget as HTMLImageElement).src =
                        'https://via.placeholder.com/40x40?text=IMG';
                    }}
                  />
                  <span>{source.nombre}</span>
                </button>
              ))}
            </div>
            <button className="close-button" onClick={onClose}>
              Cerrar
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 