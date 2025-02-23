import React, { useState } from "react";
import { searchMedia } from "../../api/api";
import { MediaResponse, SearchResponse } from "../../interfaces/interfaces";

interface SearchBarProps {
  onSearch: (data: SearchResponse<MediaResponse>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    setError(null);
    try {
      const response = await searchMedia(
        query,
        startDate || "",
        endDate || "",
        sortBy || "asc",
        1,
        10
      );
      console.log("Search results:", response);
      if (response) {
        onSearch(response || []);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
      console.error("Error fetching media.", error);
    } finally {
      setLoading(false);
    }
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
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="date-input"
      />

      {/* End Date */}
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
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
      <button
        onClick={handleSearch}
        className="search-button"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Error or Loading Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchBar;
