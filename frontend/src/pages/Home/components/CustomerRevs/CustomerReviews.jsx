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
        accessibility:true,
        arrows:false,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 500,
   autoplay:true,
        dots: true,

        // fade:true
    };

    return (

        <div className="slider-container">
            <h2>
            Here’s What Our Customers Have To Say About Us
            </h2>
            <Slider {...settings} className="slickCustom">
                {/* <div className="slideContainer"> */}
                <div className="reviews">
                    <img src={Pan} alt="quote" className="quote" />
                    <div className="testimonial">
                        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
                    </div>

                    <img src={CustomerImage} alt="customer" className="custImage" />

                    <div className="containName">
                        <div className="cName">
                            John Boyega
                        </div>
                        <div className="cPosition">
                            Executive Director
                        </div>
                    </div>
                </div> <div className="reviews hide">
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
                </div> <div className="reviews hide">
                    <img src={Pan} alt="quote" className="quote" />
                    <div className="testimonial">
                        Lorem ipsum dolor sit amet consectetur. Massa lobortis est nunc pellentesque mi non tellus pulvinar. Nunc ornare a mauris diam est adipiscing tempor. Pellentesque fusce pellentesque integer nunc quis fames. Egestas lacus sit habitant molestie aliquam.
                    </div>

                    <img src={CustomerImage} alt="customer" className="custImage" />

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
                </div>

                <div className="reviews">
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
                </div>

            </Slider>
        </div>

        

    );
}

export default Reviews;