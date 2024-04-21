import React from 'react';
import "./albumcard.scss"
import { Link } from 'react-router-dom';
const AlbumCard = ({ header, city, imageSrc }) => {
  return (
  
     <div className="albumContainer">
    <div className="mask">
    <h2>{header}</h2>
      <p>{city}</p>

      <Link className="diagonalPoint" to="#">
     
      </Link>
    </div>
      <img src={imageSrc} alt="Content" />
     </div>
   
  );
};

export default AlbumCard;