import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOURCES, SourceType } from '../constants/sources';

interface SourceSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSource: SourceType;
  onSourceChange: (source: SourceType) => void;
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
              <button
                className={`source-option ${currentSource === SOURCES.DISNEY ? 'active' : ''}`}
                onClick={() => {
                  onSourceChange(SOURCES.DISNEY);
                  onClose();
                }}
              >
                Disney
              </button>
              <button
                className={`source-option ${currentSource === SOURCES.POKEMON ? 'active' : ''}`}
                onClick={() => {
                  onSourceChange(SOURCES.POKEMON);
                  onClose();
                }}
              >
                Pokémon
              </button>
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