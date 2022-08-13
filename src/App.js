import { useLoadScript } from "@react-google-maps/api";
import "./App.css";
import { MainMap } from "./components/Main-Map/main-map.component";
import { Sidenav } from "./components/Sidenav/sidenav.component";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD-eQAdA2DAAPRVDQKOCKT1KpgeKtJnDVM",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="main-container">
      <Sidenav />
      <MainMap />
    </div>
  );
}

export default App;
