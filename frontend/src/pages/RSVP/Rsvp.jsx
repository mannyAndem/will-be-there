import Header from "../../ui/Header/Header";
import "./rsvp.scss";
import Banner from "./components/Banner/Banner";
import RsvpForm from "./components/RsvpForm/RsvpForm";
import { useSearchParams } from "react-router-dom";
import { useGetEvent } from "../../hooks/events";
import Loader from "../../ui/Loader/Loader";
import { useEffect } from "react";

const Rsvp = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: event,
    isSuccess,
    isPending,
    isError,
  } = useGetEvent(searchParams.get("event"));

  useEffect(() => {
    console.log(event);
  }, [isSuccess]);

  return (
    <div className="rsvp-container">
      <div className="header-container">
        <Header />
      </div>
      {/* <div className="previous-events-header">
        <h2>Previous Events</h2>
      </div> */}
      {/* <div className="events-list">
        <EventCard img={mockEventImg} title="Halimahs Lunch Date" />
      </div> */}
      {isSuccess ? (
        <section className="rsvp-form-section">
          <Banner img={event.media?.[0]?.imageUrl} />
          <div className="rsvp-form-container">
            <RsvpForm event={event} />
          </div>
        </section>
      ) : isPending ? (
        <div className="loader-container">
          <Loader size="md" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Rsvp;
