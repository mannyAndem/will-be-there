import { HiXCircle } from "react-icons/hi2";
import { HiOutlineLink } from "react-icons/hi2";
import gmailIcon from "../../../../assets/images/gmail_symbol.svg.png";
import whatsappIcon from "../../../../assets/images/whatsapp_symbol.svg.png";
import facebookIcon from "../../../../assets/images/facebook_symbol.svg.png";
import instagramIcon from "../../../../assets/images/instagram_logo.svg.png";
import "./share-event-modal.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ShareEventModal = ({ isOpen, close, event }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyEventLink = async () => {
    await navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/rsvp?event=${event.id}`
    );

    setCopySuccess(true);
  };

  const openGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1su=RSVP%FOR%${event.name.toUpperCase()}&body=${
        import.meta.env.VITE_FRONTEND_URL
      }\/rsvp\?event=${event.id}`,
      "_blank"
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
          <div className="icon-container">
            <img src={whatsappIcon} />
          </div>
          <div className="icon-container">
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
