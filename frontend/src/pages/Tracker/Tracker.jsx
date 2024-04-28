import React, { useEffect, useState } from "react";
import Header from "../../ui/Header/Header";
import Button from "../../ui/Button/Button";
import "./tracker.scss";
import "../RSVP/rsvp.scss";
import GuestLists from "./component/Guest";
import ShareEventModal from "./component/ShareEventModal/ShareEventModal";
import { useGetEvent, useGetEvents } from "../../hooks/events";
import { useSearchParams } from "react-router-dom";
import Loader from "../../ui/Loader/Loader";
import EventCard from "../../shared-components/EventCard/EventCard";

const Tracker = () => {
  const [event, setEvent] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { isSuccess, isError, isPending, data: events } = useGetEvents();

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      const id = searchParams.get("event");
      const event = events.find((event) => event.id == id);
      console.log(event);
      setEvent(event);
    }
  }, [isSuccess, searchParams]);

  return (
    <div className="tracker-container">
      <Header />
      {isSuccess ? (
        <>
          <div className="previous-events-header">
            <h2>Event List</h2>
          </div>

          <div className="events-list">
            {events.map((event) => (
              <EventCard event={event} />
            ))}
          </div>

          {event ? (
            <>
              <ShareEventModal
                isOpen={modalOpen}
                close={closeModal}
                event={event}
              />
              <div className="previous-events-header">
                <h2>Guest List For {event.name}</h2>
                <div>
                  <Button size="sm" onClick={openModal}>
                    Share Event
                  </Button>
                </div>
              </div>
              {event.rsvps.length === 0 ? (
                <div className="no-guests">
                  No guests have RSVP'd yet. Share your event link so guests can
                  reserve an invite!
                </div>
              ) : (
                <GuestLists guests={event.rsvps} />
              )}
            </>
          ) : (
            <span className="not-selected">
              Select an event to view guest list
            </span>
          )}
        </>
      ) : isPending ? (
        <div className="loader-container">
          <Loader variant="dark" size="md" />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tracker;
