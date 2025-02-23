import { useState } from "react";
import SearchBar from "./components/SearchBar/searchBar";
import ImageTile from "./components/ImageTile/ImageTile";
import "./App.css";

import { MediaResponse, SearchResponse } from "./interfaces/interfaces";

const App = () => {
  const [images, setImages] = useState<MediaResponse[]>([]);

  const handleSearch = (data: SearchResponse<MediaResponse>) => {
    setImages(data.results);
  };

  return (
    <div className="app">
      <h1>Image Search</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => <ImageTile image={image} />)
        ) : (
          <p>No images found. Try searching for something!</p>
        )}
      </div>
    </div>
  );
};

export default App;
