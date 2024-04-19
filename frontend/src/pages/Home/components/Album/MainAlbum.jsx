import React from 'react';
// import ContentCard from './ContentCard';
import AlbumCard from './AlbumCard';
import "./albummain.scss"
import Wedding from "../../../../assets/images/wedding.png"
import Child from "../../../../assets/images/ChildWithCap.png"
import China from "../../../../assets/images/chinaEvent.png"
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
      <AlbumCard header={cardHeader1} city={cardText1} imageSrc={Wedding} />
      <AlbumCard header={cardHeader2} city={cardText2} imageSrc={Child} />
      <AlbumCard header={cardHeader3} city={cardText3} imageSrc={China} />
      
    </div>
  );
};

export default MainAlbum;