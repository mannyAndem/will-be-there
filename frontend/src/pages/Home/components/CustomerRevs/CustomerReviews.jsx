import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomerImage from "../../../../assets/images/customer.png"
import Pan from "../../../../assets/images/quote-down-square.png";
import "./reviews.scss";
import CustomerImage2 from "../../../../assets/images/customer2.png"

const Reviews = () => {
    const settings = {
        dots: true,
        infinite: true, 
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true, 
        centerPadding: '60px',
        initialSlide: 2
      };
    
    return (

        <Slider {...settings} className="slickCustom">
    {/* <div className="slideContainer"> */}
    <div className="reviews">
        <img src={Pan} alt="quote" className="quote" />
        <div className="testimonial">
        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
        </div>

        <img src={CustomerImage} alt="customer" className="custImage"/>

        <div className="containName">
            <div className="cName">
                John Boyega
            </div>
            <div className="cPosition">
                Executive Director
            </div>
        </div>
     </div> <div className="reviews">
        <img src={Pan} alt="quote" className="quote" />
        <div className="testimonial">
        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
        </div>

        <img src={CustomerImage2} alt="customer" className="custImage" />

        <div className="containName">
            <div className="cName">
                John Boyega
            </div>
            <div className="cPosition">
                Executive Director
            </div>
        </div>
     </div> <div className="reviews">
        <img src={Pan} alt="quote" className="quote" />
        <div className="testimonial">
        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
        </div>

        <img src={CustomerImage} alt="customer" className="custImage"/>

        <div className="containName">
            <div className="cName">
                John Boyega
            </div>
            <div className="cPosition">
                Executive Director
            </div>
        </div>
     </div> <div className="reviews">
        <img src={Pan} alt="quote" className="quote" />
        <div className="testimonial">
        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
        </div>

        <img src={CustomerImage2} alt="customer" className="custImage"/>

        <div className="containName">
            <div className="cName">
                John Boyega
            </div>
            <div className="cPosition">
                Executive Director
            </div>
        </div>
     </div>
   
    {/* </div> */}

    </Slider>

);
}

export default Reviews;