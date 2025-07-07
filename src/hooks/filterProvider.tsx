import { useState, type ReactNode } from "react";
import { defaultFilters, FilterContext } from "./useFilters";
import type { Filters } from "../types/Filters";

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}