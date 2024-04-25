import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Guest1 from "../../../assets/images/guest1.png"

export default function AccordionUsage() {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className="guestAttendance">
                        <div className="namePict">
                            <div className="pict">
                                <img src={Guest1} alt="" />
                            </div>
                            <div className="name">
                                Kayode Ogundiya
                                <p>kayodeogundiya@gmail.com</p>
                            </div>

                        </div>
                        <div className="attendance">
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
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Accordion 2
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Accordion Actions
                </AccordionSummary>
                <AccordionDetails>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </AccordionDetails>
                <AccordionActions>
                    <Button>Cancel</Button>
                    <Button>Agree</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}
