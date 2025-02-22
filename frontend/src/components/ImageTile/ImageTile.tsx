import React from "react";

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

interface ImageTileProps {
  image: Image;
}

const ImageTile: React.FC<ImageTileProps> = ({ image }) => {
  console.log("Image:", image);

  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const imageUrl = `${IMAGE_BASE_URL}${image.id}/s.jpg`;
  const fallbackUrl = import.meta.env.VITE_FALLBACK_IMAGE_URL;

  return (
    <div className="image-tile">
      <img
        src={imageUrl || fallbackUrl}
        alt={image.title}
        className="image"
        onError={(e) => (e.currentTarget.src = fallbackUrl)}
      />
      <div className="image-overlay">
        <div className="image-details">
          <h3 className="image-title">{image.title}</h3>
          <p>
            <strong>Photographer:</strong> {image.photographer}
          </p>
          <p>
            <strong>Source:</strong> {image.source}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageTile;
