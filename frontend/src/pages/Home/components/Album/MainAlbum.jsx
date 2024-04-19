import React from 'react';
// import ContentCard from './ContentCard';
import AlbumCard from './AlbumCard';
import "./albummain.scss"
import Pana from "../../../../assets/images/pana-2.png"
import Cuate from "../../../../assets/images/cuate.png"
import Rafiki from "../../../../assets/images/rafiki.png"
//The variables below are simply placeholders for/to the backend server after API call
const MainAlbum = () => {
  const cardHeader1 = 'A Floral Wedding';
  const cardText1 = 'City.State Posted by {User} 44 Photos 6 days ago';

  const cardHeader2= 'Eco friendly Birthday'
  const cardText2='City.State Posted by {User} 44 Photos 6 days ago';


  const cardHeader3='A Refreshing Alumni Meet'
  const cardText3='City.State Posted by {User} 44 Photos 6 days ago';
  return (
    <div className='mainAlbumContainer'>
      <AlbumCard header={cardHeader1} city={cardText1} imageSrc={Pana} />
      <AlbumCard header={cardHeader2} city={cardText2} imageSrc={Cuate} />
      <AlbumCard header={cardHeader3} city={cardText3} imageSrc={Rafiki} />
      
    </div>
  );
};

export default MainAlbum;