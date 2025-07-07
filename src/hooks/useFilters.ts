'use client';

import React, { createContext, useContext } from 'react';
import type { Filters } from '../types/Filters';

interface FilterContextValue {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export const defaultFilters: Filters = {
  songs: true,
  albums: true,
  artists: true,
};

export const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
