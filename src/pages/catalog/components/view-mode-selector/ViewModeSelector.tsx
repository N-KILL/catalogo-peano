import React from 'react';

// Icons
import { MdGridOn } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";

// Css
import './ViewModeSelector.css';

interface ViewModeSelectorProps {
  viewMode: 'table' | 'cards';
  setViewMode: (mode: 'table' | 'cards') => void;
}

export function ViewModeSelector({ viewMode, setViewMode }: ViewModeSelectorProps) {
  return (
    <div className="view-mode-selector">
      <button
        className={viewMode === 'table' ? 'active' : ''}
        onClick={() => setViewMode('table')}
      >
        <CiBoxList size={24} /> Lista
      </button>
      <button
        className={viewMode === 'cards' ? 'active' : ''}
        onClick={() => setViewMode('cards')}
      >
        <MdGridOn size={24} /> Tarjetas
      </button>
    </div>
  );
}