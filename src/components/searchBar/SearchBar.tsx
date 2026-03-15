import React from "react";

// Icons
import { FiSearch } from "react-icons/fi";

// Css
import './SearchBar.css';

export function SearchBar({ handleSearch, query, setQuery, placeholder }: { handleSearch: (e: React.SubmitEvent) => void, query: string, setQuery: (query: string) => void, placeholder: string }) {
    return (
        <form className="hero-search" onSubmit={handleSearch}>
            <div className="hero-search-input-wrapper">
                <FiSearch className="hero-search-icon" />
                <input
                    type="text"
                    className="hero-search-input"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <button type="submit" className="hero-search-btn">
                Buscar
            </button>
        </form>
    )
};