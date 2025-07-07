'use client';

import { useFilters } from "../../hooks/useFilters";
import type { Filters } from "../../types/Filters";

export default function FilterToggle() {
  const { setFilters } = useFilters();

  // Define the exact keys explicitly for type safety
  const filterKeys = ['songs', 'albums', 'artists'] as const;
  type FilterKey = typeof filterKeys[number];

  const toggleFilter = (key: FilterKey) => {
    setFilters((prev: Filters) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex gap-2 mb-6">
      {filterKeys.map((key) => (
        <button
        //   label={key.charAt(0).toUpperCase() + key.slice(1)}
          key={key}
          onClick={() => toggleFilter(key)}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
      ))}
    </div>
  );
}
