import { useSelector } from "react-redux";
import { RestaurantCard } from "../Restaurant-Card/restaurant-card.component";

export const RestaurantList = (props) => {
  const restaurants = useSelector((state) => state.restaurants);
  return (
    <div>
      {restaurants.map((data) => (
        <RestaurantCard restaurant={data} key={data.place_id} />
      ))}
    </div>
  );
};
