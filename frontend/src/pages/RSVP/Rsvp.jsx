import Header from "../../ui/Header/Header";
import "./rsvp.scss";
import Banner from "./components/Banner/Banner";
import RsvpForm from "./components/RsvpForm/RsvpForm";
import { useSearchParams } from "react-router-dom";
import { useGetEvent } from "../../hooks/events";
import Loader from "../../ui/Loader/Loader";
import { useEffect, useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { useAuthContext } from "../../contexts/AuthContext";
import Footer from "../Home/components/Footer/Footer";
import RsvpCard from "../RsvpCard/RsvpCard";

const Rsvp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthContext();
  const eventId = searchParams.get("event");
  const rsvpId = searchParams.get("rsvp");
  const [rsvp, setRsvp] = useState(null);

  const {
    data: event,
    isSuccess,
    isPending,
    isError,
    refetch,
  } = useGetEvent(eventId, false);

  useEffect(() => {
    if (eventId) {
      refetch();
    }

    if (rsvpId) {
      setRsvp(user.rsvps.find((rsvp) => rsvp.id == rsvpId));
    }
  }, [searchParams]);

  return (
    <>
      <div className="rsvp-container">
        <div className="header-container">
          <Header />
        </div>
        <LoginPopup isLoggedIn={!!user} />
        {user && (
          <>
            <div className="previous-events-header">
              <h2>Previous Events</h2>
            </div>
            <div className="events-list">
              {user.rsvps.length > 0 ? (
                user.rsvps.map((rsvp) => <RsvpCard rsvp={rsvp} />)
              ) : (
                <div className="no-rsvps">
                  <span>Start registering for events to view them here</span>
                </div>
              )}
            </div>
          </>
        )}
        {!user && !eventId && (
          <div className="no-event">
            <span>
              Please click on a link shared by an organizer to rsvp for an event
              or login to view previous rsvps.
            </span>
          </div>
        )}
        {isSuccess ? (
          <section className="rsvp-form-section">
            <Banner img={event.media?.[0]?.imageUrl} />
            <div className="rsvp-form-container">
              <RsvpForm event={event} rsvp={rsvp} />
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
      <Footer />
    </>
  );
};

export default Rsvp;
