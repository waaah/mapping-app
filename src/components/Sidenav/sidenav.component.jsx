import "./sidenav.component.css";
import { RestaurantList } from "./Restaurant-List/restaurant-list.component";

export const Sidenav = () => {
  return (
    <div className="sidenav">
      <RestaurantList></RestaurantList>
    </div>
  );
};
