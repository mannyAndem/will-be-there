import React from 'react';
import "./albumcard.scss"
const AlbumCard = ({ header, city, imageSrc }) => {
  return (
  
     <div className="albumContainer">
    <div className="mask">
    <h2>{header}</h2>
      <p>{city}</p>

      <div className="diagonalPoint">
        
      </div>
    </div>
      <img src={imageSrc} alt="Content" />
     </div>
   
  );
};

export default AlbumCard;