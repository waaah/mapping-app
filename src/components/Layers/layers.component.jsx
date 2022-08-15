import * as React from "react";
import Box from "@mui/material/Box";
import LayersIcon from "@mui/icons-material/Layers";
import CloseIcon from "@mui/icons-material/Close";

import Fab from "@mui/material/Fab";
import "./layers.component.css";
import { LayerPane } from "./LayerPane/layer.pane.component";

export const Layers = () => {
  const [isShow, setIsShow] = React.useState(false);
  return (
    <div className="layers--container">
      {!isShow ? (
        <Fab
          className="layers--button"
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setIsShow(true)}
        >
          <LayersIcon className="sidenav-item--icon" />
          &nbsp;
          <span>Layers</span>
        </Fab>
      ) : (
        <Fab
          onClick={() => setIsShow(false)}
          className="layers--button"
          color="error"
          aria-label="add"
        >
          <CloseIcon className="sidenav-item--icon" />
        </Fab>
      )}

      <LayerPane isShowPane={isShow} />
    </div>
  );
};
