import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSources } from '../services/sourceService';
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
  const [sources, setSources] = useState<CharacterSource[]>([]);

  useEffect(() => {
    const loadSources = async () => {
      try {
        const fetchedSources = await fetchSources();
        setSources(fetchedSources);
      } catch (error) {
        console.error('Error loading sources:', error);
      }
    };

    if (isOpen) {
      loadSources();
    }
  }, [isOpen]);

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
              {sources.map((source) => (
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