import "./App.css";
import { MainMap } from "./components/Main-Map/main-map.component";
import { Sidenav } from "./components/Sidenav/sidenav.component";

function App() {
  return (
    <div className="main-container">
      <Sidenav />
      <MainMap />
    </div>
  );
}

export default App;
