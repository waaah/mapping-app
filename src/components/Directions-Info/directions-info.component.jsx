import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ScheduleIcon from "@mui/icons-material/Schedule";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../services/location";
import { getDirections } from "../../store/selected-location/selected-location.slices";
import "./directions-info.styles.css";

export const DirectionsInfo = (props) => {
  const { mode: selectedMode, directionData } = useSelector(
    (state) => state.selectedLocation
  );
  const dispatch = useDispatch();
  const { restaurant } = props;
  const modes = [
    {
      name: "Driving",
      icon: <DirectionsCarIcon />,
      mode: window.google.maps.TravelMode.DRIVING,
    },
    {
      name: "Walking",
      icon: <DirectionsWalkIcon />,
      mode: window.google.maps.TravelMode.WALKING,
    },
    {
      name: "Bicycling",
      icon: <DirectionsBikeIcon />,
      mode: window.google.maps.TravelMode.BICYCLING,
    },
    {
      name: "Transit",
      icon: <DirectionsTransitIcon />,
      mode: window.google.maps.TravelMode.TRANSIT,
    },
  ];
  const getLocationLabel = (currentMode) => <>{currentMode.icon}</>;

  const onGetDirections = async (mode) => {
    const origin = await getLocation();
    const { lat, lng } = restaurant;
    const destination = { lat, lng };
    dispatch(getDirections({ origin, destination, mode }));
  };
  return (
    <>
      <div className="flex-container">
        <h3 className="main-header">Directions</h3>
      </div>
      <Stack sx={{ mt: 2 }} direction="row" spacing={1}>
        {modes.map((currentMode) => (
          <Chip
            key={currentMode.name}
            clickable
            onClick={() => onGetDirections(currentMode.mode)}
            label={getLocationLabel(currentMode)}
            color="primary"
            variant={selectedMode === currentMode.mode ? "filled" : "outlined"}
          />
        ))}
      </Stack>
      {directionData && (
        <>
          <div className="directions--info">
            <ScheduleIcon />
            &nbsp; <span>{directionData.estimatedTime}</span>
          </div>
          <div className="directions--info">
            <DirectionsCarIcon /> &nbsp; {directionData.estimatedDistance}
          </div>
        </>
      )}
    </>
  );
};
