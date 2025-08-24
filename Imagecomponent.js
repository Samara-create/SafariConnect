import React from 'react';

const ImageComponent = ({ src, alt, className }) => {
  const handleError = (e) => {
    e.target.src = 'https://placehold.co/400x300?text=Image+Unavailable';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default ImageComponent;
