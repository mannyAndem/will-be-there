import React from 'react';
import "./contentcard.scss"
const ContentCard = ({ header, text, imageSrc }) => {
  return (
  
     <div className="containerChildren">
    <div className="mask">
    <h2>{header}</h2>
      <p>{text}</p>
    </div>
      <img src={imageSrc} alt="Content" />
     </div>
   
  );
};

export default ContentCard;