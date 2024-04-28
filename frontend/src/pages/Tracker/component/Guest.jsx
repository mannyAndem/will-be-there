import * as React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Guest1 from "../../../assets/images/guest1.png";
import Guest2 from "../../../assets/images/guest2.png";
import Guest3 from "../../../assets/images/roselyn.png";
import Guest4 from "../../../assets/images/temi.png";
import Guest5 from "../../../assets/images/remi.png";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { HiUserCircle } from "react-icons/hi2";
const CustomIcon = ({ expanded }) => {
  return (
    <ArrowDropDownIcon
      style={{ transform: expanded ? "rotate(180deg)" : "none" }}
      fontSize="large"
    />
  );
};

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary
    {...props}
    expandIcon={<CustomIcon expanded={props.expanded} />}
  >
    <div className="headerContents">
      <header>{props.title}</header>
      <div className={`partOfTheHeader ${props.expanded ? "hidden" : ""}`}>
        {props.partOfTheHeaderContent}
      </div>
    </div>
  </AccordionSummary>
))(({ theme }) => ({
  ".partOfTheHeader.hidden": {
    visibility: "hidden",
    height: 0,
  },
}));

const GuestLists = ({ guests }) => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleChange = (index) => (event, isExpanded) => {
    const newExpandedAccordions = isExpanded
      ? [...expandedAccordions, index]
      : expandedAccordions.filter((i) => i !== index);
    setExpandedAccordions(newExpandedAccordions);
  };

  const accordionData = guests.map((guest) => ({
    title: (
      <div className="namePict">
        {/* <div className="pict">
          <img src={Guest1} alt="Guest Image" />
        </div> */}
        <HiUserCircle size={40} color="#23c55e" />
        <div className="name">
          {guest.name}
          <p>{guest.email}</p>
        </div>
      </div>
    ),
    content: (
      <div className="guestDetails">
        {/* <div className="contact">
          <p>Contact Info :</p> +234 8164863846
        </div> */}
        <div className="contact">
          <p>Additional Guests :</p> {guest.guestNames.length}
        </div>
        <div className="contact">
          <p>Names of Additional Guests:</p> {guest.guestNames.join(", ")}
        </div>
        <div className="contact">
          <p>Attendance Status:</p> Attending
        </div>

        <div className="contact">
          <p>Registry:</p> {guest.registry[0]}
        </div>

        <div className="more">{guest.notes}</div>
      </div>
    ),
    partOfTheHeaderContent: (
      <div className="attendance">
        <div className="status">
          Attendance Status:
          <div className="prob">
            <div className="circle active"></div>
            <div className="coming"> Attending </div>
            <div className="circle"> </div>
            <div className="coming"> Not Attending </div>
            <div className="circle"> </div>
            <div className="coming"> Maybe </div>
          </div>
        </div>
      </div>
    ),
  }));
  // const accordionData = [
  //   {
  //     title: (
  //       <div className="namePict">
  //         <div className="pict">
  //           <img src={Guest1} alt="Guest Image" />
  //         </div>
  //         <div className="name">
  //           Kayode Ogundiya
  //           <p>kayodeogundiya@gmail.com</p>
  //         </div>
  //       </div>
  //     ),
  //     content: (
  //       <div className="guestDetails">
  //         <div className="contact">
  //           <p>Contact Info :</p> +234 8164863846
  //         </div>
  //         <div className="contact">
  //           <p>Additional Guests :</p> 2
  //         </div>
  //         <div className="contact">
  //           <p>Name of Additional Guest:</p> Ifeanyi Chizaram, Halimah Gafar
  //         </div>
  //         <div className="contact">
  //           <p>Attendance Status:</p> Attending
  //         </div>

  //         <div className="contact">
  //           <p>Registry:</p> Car
  //         </div>

  //         <div className="more">
  //           As you stand together in splendid array, Surrounded by loved ones on
  //           this perfect day, Let your union be blessed by the heavens above,
  //           Imbuing your bond with infinite love.{" "}
  //         </div>
  //       </div>
  //     ),
  //     partOfTheHeaderContent: (
  //       <div className="attendance">
  //         <div className="status">
  //           Attendance Status:
  //           <div className="prob">
  //             <div className="circle active"></div>
  //             <div className="coming"> Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Not Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Maybe </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="namePict">
  //         <div className="pict">
  //           <img src={Guest2} alt="Guest Image" />
  //         </div>
  //         <div className="name">
  //           Adese Samson
  //           <p>adesesamson@gmail.com</p>
  //         </div>
  //       </div>
  //     ),
  //     content: (
  //       <div className="guestDetails">
  //         <div className="contact">
  //           <p>Contact Info :</p> +234 8164863846
  //         </div>
  //         <div className="contact">
  //           <p>Additional Guests :</p> 2
  //         </div>
  //         <div className="contact">
  //           <p>Name of Additional Guest:</p> Ifeanyi Chizaram, Halimah Gafar
  //         </div>
  //         <div className="contact">
  //           <p>Attendance Status:</p> Attending
  //         </div>

  //         <div className="contact">
  //           <p>Registry:</p> Car
  //         </div>

  //         <div className="more">
  //           From this moment on, your lives intertwine, Woven in a tapestry
  //           creatively divine. May this marriage bring transcendent delight, As
  //           you both bask in love's eternal light.
  //         </div>
  //       </div>
  //     ),
  //     partOfTheHeaderContent: (
  //       <div className="attendance">
  //         <div className="status">
  //           Attendance Status:
  //           <div className="prob">
  //             <div className="circle active"></div>
  //             <div className="coming"> Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Not Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Maybe </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="namePict">
  //         <div className="pict">
  //           <img src={Guest3} alt="Guest Image" />
  //         </div>
  //         <div className="name">
  //           Roselyn Edewor
  //           <p>roselynedewor@gmail.com</p>
  //         </div>
  //       </div>
  //     ),
  //     content: (
  //       <div className="guestDetails">
  //         <div className="contact">
  //           <p>Contact Info :</p> +234 8164863846
  //         </div>
  //         <div className="contact">
  //           <p>Additional Guests :</p> 2
  //         </div>
  //         <div className="contact">
  //           <p>Name of Additional Guest:</p> Ifeanyi Chizaram, Halimah Gafar
  //         </div>
  //         <div className="contact">
  //           <p>Attendance Status:</p> Attending
  //         </div>

  //         <div className="contact">
  //           <p>Registry:</p> Car
  //         </div>

  //         <div className="more">
  //           May your union be a radiant bloom, A forever bond too beautiful to
  //           consume. Two lives, two hearts joining as one.{" "}
  //         </div>
  //       </div>
  //     ),
  //     partOfTheHeaderContent: (
  //       <div className="attendance">
  //         <div className="status">
  //           Attendance Status:
  //           <div className="prob">
  //             <div className="circle"></div>
  //             <div className="coming"> Attending </div>
  //             <div className="circle active"> </div>
  //             <div className="coming"> Not Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Maybe </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="namePict">
  //         <div className="pict">
  //           <img src={Guest4} alt="Guest Image" />
  //         </div>
  //         <div className="name">
  //           Temiloluwa Adelakun
  //           <p>temiloluwaadelekan@gmail.com</p>
  //         </div>
  //       </div>
  //     ),
  //     content: (
  //       <div className="guestDetails">
  //         <div className="contact">
  //           <p>Contact Info :</p> +234 8164863846
  //         </div>
  //         <div className="contact">
  //           <p>Additional Guests :</p> 2
  //         </div>
  //         <div className="contact">
  //           <p>Name of Additional Guest:</p> Ifeanyi Chizaram, Halimah Gafar
  //         </div>
  //         <div className="contact">
  //           <p>Attendance Status:</p> Attending
  //         </div>

  //         <div className="contact">
  //           <p>Registry:</p> Car
  //         </div>

  //         <div className="more">
  //           Celebrate this moment under angels' embrace, Joy written on every
  //           luminous face. As you both joyfully take your vows, Let a shower of
  //           blessings rain down.{" "}
  //         </div>
  //       </div>
  //     ),
  //     partOfTheHeaderContent: (
  //       <div className="attendance">
  //         <div className="status">
  //           Attendance Status:
  //           <div className="prob">
  //             <div className="circle active"></div>
  //             <div className="coming"> Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Not Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Maybe </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  //   {
  //     title: (
  //       <div className="namePict">
  //         <div className="pict">
  //           <img src={Guest5} alt="Guest Image" />
  //         </div>
  //         <div className="name">
  //           Remilekun Mogbadunade
  //           <p>remilekunmogbadunade@gmail.com</p>
  //         </div>
  //       </div>
  //     ),
  //     content: (
  //       <div className="guestDetails">
  //         <div className="contact">
  //           <p>Contact Info :</p> +234 8164863846
  //         </div>
  //         <div className="contact">
  //           <p>Additional Guests :</p> 2
  //         </div>
  //         <div className="contact">
  //           <p>Name of Additional Guest:</p> Ifeanyi Chizaram, Halimah Gafar
  //         </div>
  //         <div className="contact">
  //           <p>Attendance Status:</p> Attending
  //         </div>

  //         <div className="contact">
  //           <p>Registry:</p> Car
  //         </div>

  //         <div className="more">
  //           Hand in hand, may your lives entwine, A lifetime of memories you'll
  //           define. United in a love that's tender and true, The best of
  //           adventures still awaits for you two.{" "}
  //         </div>
  //       </div>
  //     ),
  //     partOfTheHeaderContent: (
  //       <div className="attendance">
  //         <div className="status">
  //           Attendance Status:
  //           <div className="prob">
  //             <div className="circle"></div>
  //             <div className="coming"> Attending </div>
  //             <div className="circle"> </div>
  //             <div className="coming"> Not Attending </div>
  //             <div className="circle active"> </div>
  //             <div className="coming"> Maybe </div>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion
          key={index}
          expanded={expandedAccordions.includes(index)}
          onChange={handleChange(index)}
        >
          <StyledAccordionSummary
            expanded={expandedAccordions.includes(index)}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            title={item.title}
            partOfTheHeaderContent={item.partOfTheHeaderContent}
            className="guestAttendance"
          />
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default GuestLists;
