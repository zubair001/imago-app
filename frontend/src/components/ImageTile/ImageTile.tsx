import React from "react";
import { ImageTileProps } from "../../interfaces/interfaces";

const ImageTile: React.FC<ImageTileProps> = ({ image }) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
  const FALLBACK_IMAGE_URL = import.meta.env.VITE_FALLBACK_IMAGE_URL;

  // Ensure that we have a valid base URL for images
  const imageUrl =
    IMAGE_BASE_URL && image.id
      ? `${IMAGE_BASE_URL}${image.id}/s.jpg`
      : FALLBACK_IMAGE_URL;

  return (
    <div className="image-tile">
      <img
        src={imageUrl}
        alt={image.title}
        className="image"
        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE_URL)}
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
