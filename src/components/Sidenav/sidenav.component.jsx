import "./sidenav.component.css";
import { RestaurantList } from "./Restaurant-List/restaurant-list.component";
import { RestaurantCard } from "../Restaurant-Card/restaurant-card.component";

export const Sidenav = () => {
  return (
    <div className="sidenav">
      <RestaurantList></RestaurantList>
      <RestaurantCard></RestaurantCard>
    </div>
  );
};
