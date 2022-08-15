import "./map-loader.component.css";
import CircularProgress from "@mui/material/CircularProgress";

export const MapLoader = () => {
  return (
    <div className="loader">
      <div className="loader--container">
        <CircularProgress className="loader-center" />
      </div>
    </div>
  );
};
