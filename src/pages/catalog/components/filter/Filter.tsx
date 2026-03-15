import React from "react";

// Components
import { SearchBar } from "components/searchBar/SearchBar";

// Css
import "./Filter.css";

interface FilterSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function FilterSection({ searchTerm, onSearchChange }: FilterSectionProps) {
  return (
    <SearchBar
      handleSearch={(e) => {
        e.preventDefault();
        onSearchChange(searchTerm);
      }}
      placeholder="Filtrar por nombre o código..."
      setQuery={onSearchChange}
      query={searchTerm}
    />
  );
}

