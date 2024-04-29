import Header from "../../ui/Header/Header";
import EventCard from "../../shared-components/EventCard/EventCard";
import mockEventImg from "../../assets/images/event-image.png";
import "./events.scss";
import CreateEventButton from "./components/CreateEventButton/CreateEventButton";
import { LuPenLine } from "react-icons/lu";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import Button from "../../ui/Button/Button";
import CreateEventForm from "./components/CreateEventForm/CreateEventForm";
import CreateTemplateButton from "./components/CreateTemplateButton/CreateTemplateButton";
import Tab from "./Tab/Tab";
import TemplateCard from "./components/TemplateCard/TemplateCard";
import templateExampleImg from "../../assets/images/rsvp-image-example.jpg";
import { useGetEvents } from "../../hooks/events";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader/Loader";
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";

const Events = () => {
  const { data: events, isSuccess, isError, isPending, error } = useGetEvents();
  const [searchParams, setSearchParams] = useSearchParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      console.log(events);

      const id = searchParams.get("event");

      if (id) {
        const event = events.find((event) => event.id == id);
        setEvent(event);
      } else {
        setEvent(null);
      }
    }

    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, events, searchParams]);

  return (
    <div className="events-container">
      <div className="header-container">
        <Header />
      </div>
      <main className="event-main-content">
        {isSuccess ? (
          <>
            <div className="events-list">
              {events.map((event) => (
                <EventCard event={event} />
              ))}
              <CreateEventButton />
            </div>
            <section className="create-event-form-section">
              <div className="section-header">
                <h1>Create Event</h1>
                <div>
                  <Button size="sm">
                    <div>
                      <span>Edit event details</span>
                      <LuPenLine size={30} className="pen-icon" />
                    </div>
                  </Button>
                </div>
              </div>
              <CreateEventForm event={event} />
            </section>
            <section className="create-template-section">
              <div className="section-header">
                <h1>Templates</h1>
                <div>
                  <Button size="sm">My Library</Button>
                </div>
              </div>
              <CreateTemplateButton />
            </section>
            <section className="templates-section">
              <div className="section-header">
                <h1>Popular RSVP Templates</h1>
                <div>
                  <Button size="sm">Favourites</Button>
                </div>
              </div>
              <div className="tabs-container">
                <div>
                  <Tab title="Weddings" active={true} />
                </div>
                <div>
                  <Tab title="Birthdays" />
                </div>
                <div>
                  <Tab title="Christmas" />
                </div>
                <div>
                  <Tab title="Baby Shower" />
                </div>
              </div>
              <div className="templates-container">
                <TemplateCard img={templateExampleImg} />
                <TemplateCard img={templateExampleImg} />
                <TemplateCard img={templateExampleImg} />
                <TemplateCard img={templateExampleImg} />
                <TemplateCard img={templateExampleImg} />
                <TemplateCard img={templateExampleImg} />
              </div>
            </section>
            <div>
              <button className="view-more-button">
                <span>View more</span>
                <HiOutlineChevronDoubleRight
                  size={24}
                  className="right-arrow-icon"
                />
              </button>
            </div>
          </>
        ) : isPending ? (
          <Loader variant="dark" size="md" />
        ) : isError ? (
          <ErrorMessage message="Something went wrong" />
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
};

export default Events;
