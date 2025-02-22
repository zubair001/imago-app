import React, { useState } from "react";
import { searchMedia, MediaResponse } from "../../api/api";

interface SearchBarProps {
  onSearch: (data: MediaResponse[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    const results = await searchMedia(query, date1, date2, sortBy);
    console.log("Search results:", results);
    onSearch(results);
  };

  // Handle the Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search images..."
        className="search-input"
      />

      {/* Start Date */}
      <input
        type="date"
        value={date1}
        onChange={(e) => setDate1(e.target.value)}
        className="date-input"
      />

      {/* End Date */}
      <input
        type="date"
        value={date2}
        onChange={(e) => setDate2(e.target.value)}
        className="date-input"
      />

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "asc" | "desc")}
        className="sort-select"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>

      {/* Search Button */}
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
