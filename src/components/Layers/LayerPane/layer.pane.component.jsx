import { FiltersPane } from "../Filters/filters.component";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DrawingPane } from "../Drawing/drawing-pane.component";

export const LayerPane = (props) => {
  const { isShowPane } = props;

  return (
    <Card
      className={`${!isShowPane && "layers--card-hide"} layers--card`}
      sx={{ minWidth: 275 }}
    >
      <CardContent>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Draw Shape</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DrawingPane />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FiltersPane></FiltersPane>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};
