import "./sidenav.component.css";
import { RestaurantList } from "./Restaurant-List/restaurant-list.component";
import { RestaurantCard } from "../Restaurant-Card/restaurant-card.component";
export const Sidenav = () => {
  return (
    <div className="sidenav flex-container">
      {/* <div className="menu">
        <p
          className={`sidenav-item ${
            selected === "Restaurants" && "sidenav-item--selected"
          }`}
          onClick={() => setSelected("Restaurants")}
        >
          <ListIcon className="sidenav-item--icon" />
          <span className={`sidenav-item--span`}>Restaurants</span>
        </p>
        <p
          className={`sidenav-item ${
            selected === "Layers" && "sidenav-item--selected"
          }`}
          onClick={() => setSelected("Layers")}
        >
          <LayersIcon className="sidenav-item--icon" />
          <span
            className={`sidenav-item--span ${
              selected === "Layers" && "sidenav-item--selected"
            }`}
          >
            Layers
          </span>
        </p>
      </div> */}
      <div className="sidepane">
        <RestaurantList></RestaurantList>
        <RestaurantCard></RestaurantCard>
      </div>
    </div>
  );
};
