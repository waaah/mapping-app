import { useSelector } from "react-redux";
import { RestaurantItem } from "../Restaurant-Item/restaurant-item.component";

export const RestaurantList = (props) => {
  const restaurants = useSelector((state) => state.restaurants.data);
  return (
    <div>
      {restaurants.map((data) => (
        <RestaurantItem restaurant={data} key={data.place_id} />
      ))}
    </div>
  );
};
