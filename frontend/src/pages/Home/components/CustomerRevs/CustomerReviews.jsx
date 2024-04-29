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
        className: "center",
        accessibility:true,
        arrows:false,
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 2,
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
                    I've used several event platforms in the past, but none come close to the functionality and user-friendly experience provided by this one. The customizable options allowed me to create a truly unique and branded event that left a lasting impression on my attendees.
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
                </div> <div className="reviews ">
                    <img src={Pan} alt="quote" className="quote" />
                    <div className="testimonial">
                    As a frequent event-goer, I appreciate the seamless registration process and clear communication from this platform. The mobile app made navigating the event a pleasure, and I loved the interactive features that enhanced my overall experience.
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
                </div> <div className="reviews ">
                    <img src={Pan} alt="quote" className="quote" />
                    <div className="testimonial">
                    Organizing a large-scale trade show was a daunting task, but this event platform made it incredibly manageable. From vendor management to attendee tracking, every aspect was well-thought-out and efficient. Our event was a resounding success, thanks to this incredible tool.
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
                    As someone who has attended countless events, I can confidently say that this platform sets a new standard for event technology. The seamless check-in process, real-time updates, and interactive maps made my experience truly remarkable.
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
                    From start to finish, this event platform exceeded my expectations. The comprehensive analytics and reporting tools provided invaluable insights, allowing us to measure the success of our event and plan even better for the future.
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