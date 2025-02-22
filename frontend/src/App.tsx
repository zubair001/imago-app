import { useState } from "react";
import SearchBar from "./components/SearchBar/searchBar";
import ImageTile from "./components/ImageTile/ImageTile";
import "./App.css";

interface Image {
  id: string;
  title: string;
  date: string;
  description: string;
  height: number;
  width: number;
  photographer: string;
  source: string;
}

const App = () => {
  const [images, setImages] = useState<Image[]>([]);

  const handleSearch = (data: Image[]) => {

    if (!Array.isArray(data)) {
      console.error("Invalid response format:", data);
      return;
    }

    setImages(data);
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
