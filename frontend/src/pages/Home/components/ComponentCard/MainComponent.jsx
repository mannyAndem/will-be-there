import React from 'react';
import ContentCard from './ContentCard';
import "./cardstyle.scss"
import Pana from "../../../../assets/images/pana-2.png"
import Cuate from "../../../../assets/images/cuate.png"
import Rafiki from "../../../../assets/images/rafiki.png"

const Card = () => {
  const cardHeader1 = 'Create and Customize';
  const cardText1 = 'With a diverse selection of professionally designed templates and intuitive editing tools, users can tailor every aspect of their invitations to reflect the unique theme and style of their event.';

  const cardHeader2= 'Invite Guest'
  const cardText2='Organizers can easily create guest lists, and send personalized invitations to their desired recipients';


  const cardHeader3='Track RSVP'
  const cardText3='From confirming attendance to accommodating special requests and preferences,  users can effortlessly track RSVPs, view guest lists, and make informed decisions to ensure a seamless event experience.'
  return (
    <div className='mainContainer'>
      <ContentCard header={cardHeader1} text={cardText1} imageSrc={Pana} />
      <ContentCard header={cardHeader2} text={cardText2} imageSrc={Cuate} />
      <ContentCard header={cardHeader3} text={cardText3} imageSrc={Rafiki} />
      
    </div>
  );
};

export default Card;