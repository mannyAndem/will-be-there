import * as React from 'react';
import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  Typography,
  AccordionSummary,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Guest1 from "../../../assets/images/guest1.png"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const CustomIcon = ({ expanded }) => {
  return (
    <ArrowDropDownIcon
      style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
      fontSize="large"
    />
  );
};

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary {...props} expandIcon={<CustomIcon expanded={props.expanded} />}>
    <div className="headerContents">
      <header>{props.title}</header>
      <div className={`partOfTheHeader ${props.expanded ? 'hidden' : ''}`}>
        {props.partOfTheHeaderContent}
      </div>
    </div>
  </AccordionSummary>
))(({ theme }) => ({
  '.partOfTheHeader.hidden': {
    visibility: 'hidden',
    height: 0,
  },
}));

const GuestLists = () => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const handleChange = (index) => (event, isExpanded) => {
    const newExpandedAccordions = isExpanded
      ? [...expandedAccordions, index]
      : expandedAccordions.filter((i) => i !== index);
    setExpandedAccordions(newExpandedAccordions);
  };

  const accordionData = [
    {
      title: (<div className="namePict">
                            <div className="pict">
                                <img src={Guest1} alt="jj" />
                            </div>
                            <div className="name">
                                Kayode Ogundiya
                                <p>kayodeogundiya@gmail.com</p>
                            </div>

                        </div>),
      content: <div className="guestDetails">
        <div className="contact">
            <p>Contact Info :</p> +234 8164863846
        </div>
        <div className="contact">
            <p>Additional Guests :</p> 2
        </div>
        <div className="contact">
            <p>Name of Additional Guest:</p> Ifeanyi Chizaram
        </div>
      </div>,
      partOfTheHeaderContent: <div className="attendance">
      <div className="status">
          Attendance Status:
           <div className="prob">
              <div className="circle">
                  <div className="green">
                  </div>
              </div>
              <div className="coming"> Attending </div>
              <div className="circle"> </div>
              <div className="coming"> Not Attending </div>
              <div className="circle"> </div>
              <div className="coming"> Maybe </div>
          </div>
      </div>
  </div>,
    },
    {
      title: (<div className="namePict">
      <div className="pict">
          <img src={Guest1} alt="" />
      </div>
      <div className="name">
          Adese Samson
          <p>kayodeogundiya@gmail.com</p>
      </div>

  </div>),
      content: 'Content for Accordion 2',
      partOfTheHeaderContent: (
        <div>
          <p>Part of the header for Accordion 2</p>
          <div>
            <span>Nested div content</span>
            <button>Click me</button>
          </div>
        </div>
      ),
    },
    {
      title: 'Accordion 3',
      content: 'Content for Accordion 3',
      partOfTheHeaderContent: (
        <p>Part of the header for Accordion 3 with a paragraph</p>
      ),
    },
    {
      title: 'Accordion 4',
      content: 'Content for Accordion 4',
      partOfTheHeaderContent: null,
    },
    {
      title: 'Accordion 5',
      content: 'Content for Accordion 5',
      partOfTheHeaderContent: (
        <div>
          <h4>Part of the header for Accordion 5</h4>
          <p>With additional content</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      {accordionData.map((item, index) => (
        <Accordion key={index} expanded={expandedAccordions.includes(index)} onChange={handleChange(index)}>
          <StyledAccordionSummary
            expanded={expandedAccordions.includes(index)}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            title={item.title}
            partOfTheHeaderContent={item.partOfTheHeaderContent}
        className="guestAttendance"  />
          <AccordionDetails>
            <Typography>{item.content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default GuestLists;