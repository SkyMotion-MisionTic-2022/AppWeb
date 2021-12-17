import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

const AccordionStyled = styled((props) => <Accordion {...props} />)(({ theme }) => ({
  backgroundColor: 'skyblue',
}));
const AccordionSummaryStyled = styled((props) => <AccordionSummary {...props} />)(({ theme }) => ({
  backgroundColor: 'skyblue',
}));
const AccordionDetailsStyled = styled((props) => <AccordionDetails {...props} />)(({ theme }) => ({
  backgroundColor: '#ccc',
}));

export { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled };