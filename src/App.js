import { useLoadScript } from "@react-google-maps/api";
import "./App.css";
import { MainMap } from "./components/Main-Map/main-map.component";
import { Sidenav } from "./components/Sidenav/sidenav.component";
import { Layers } from "./components/Layers/layers.component";
import { MapLoader } from "./components/MapLoader/map-loader.component";
import { useSelector } from "react-redux";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const { isLoading } = useSelector((state) => state.restaurants);

  if (!isLoaded) return null;

  return (
    <div className="main-container">
      {isLoading && <MapLoader />}
      <Layers />
      <Sidenav />
      <MainMap />
    </div>
  );
}

export default App;
