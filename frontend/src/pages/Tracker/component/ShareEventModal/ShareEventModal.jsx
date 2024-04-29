import { HiXCircle } from "react-icons/hi2";
import { HiOutlineLink } from "react-icons/hi2";
import gmailIcon from "../../../../assets/images/gmail_symbol.svg.png";
import whatsappIcon from "../../../../assets/images/whatsapp_symbol.svg.png";
import facebookIcon from "../../../../assets/images/facebook_symbol.svg.png";
import instagramIcon from "../../../../assets/images/instagram_logo.svg.png";
import "./share-event-modal.scss";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ShareEventModal = ({ isOpen, close, event }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const eventLink = useMemo(
    () => `${import.meta.env.VITE_FRONTEND_URL}/rsvp?event=${event.id}`,
    [event]
  );

  const copyEventLink = async () => {
    await navigator.clipboard.writeText(eventLink);

    setCopySuccess(true);
  };

  const openGmail = () => {
    // window.open(
    //   `https://mail.google.com/mail/?view=cm&fs=1su=RSVP%FOR%${event.name.toUpperCase()}&body=${
    //     import.meta.env.VITE_FRONTEND_URL
    //   }\/rsvp\?event=${event.id}`,
    //   "_blank"
    // );
    // window.open(
    //   `http://mail.google.com/mail/?view=cm&fs=1&tf=1&su=RSVP FOR ${event.name.toUpperCase()}&body=Click on this link to rsvp for this event: ${
    //     import.meta.env.VITE_FRONTEND_URL
    //   }\/rsvp\?event\=${event.id}`,
    //   "_blank"
    // );
    window.open(
      `http://mail.google.com/mail/?view=cm&fs=1&tf=1&su=RSVP FOR ${event.name.toUpperCase()}&body=Click on this link to rsvp for this event: ${encodeURIComponent(
        eventLink
      )}`,
      "_blank"
    );
  };

  const openWhatsapp = () => {
    window.open(`https://wa.me?text=${encodeURIComponent(eventLink)}`);
    // window.open(
    //   `https://wa.me/15551234567?text=I'm%20interested%20in%20your%20car%20for%20sale`
    // );
  };

  const openFacebook = () => {
    // window.open(`https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F
    // &redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`);
    window.open(
      `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${encodeURIComponent(
        eventLink
      )}&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer`
    );
  };

  useEffect(() => {
    if (copySuccess) {
      toast("Link copied");
      setCopySuccess(false);
    }
  }, [copySuccess]);

  return (
    <div className={isOpen ? "share-event-modal-overlay" : "modal-closed"}>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <div className="share-event-modal">
        <div className="share-event-modal-header">
          <h3>Share Event</h3>
          <HiXCircle size={33} className="close-icon" onClick={close} />
        </div>
        <button className="copy-link-button" onClick={copyEventLink}>
          <div className="link-icon-container">
            <HiOutlineLink size={24} />
          </div>
          <span>Copy Link</span>
        </button>
        <div className="links-container">
          <div className="icon-container" onClick={openGmail}>
            <img src={gmailIcon} />
          </div>
          <div className="icon-container" onClick={openWhatsapp}>
            <img src={whatsappIcon} />
          </div>
          <div className="icon-container" onClick={openFacebook}>
            <img src={facebookIcon} />
          </div>
          <div className="icon-container">
            <img src={instagramIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareEventModal;
