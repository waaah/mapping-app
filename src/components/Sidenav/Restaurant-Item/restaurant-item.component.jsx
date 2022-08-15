/* global google */
import * as React from "react";
import Divider from "@mui/material/Divider";
import StarRatings from "react-star-ratings";
import { selectRestaurant } from "../../../store/selected-location/selected-location.slices";
import { useDispatch } from "react-redux/es/exports";
import { getLocation } from "../../../services/location";
import "./restaurant-item.component.css";

export const RestaurantItem = (props) => {
  const dispatch = useDispatch();
  const restaurant = props.restaurant;
  const secondaryText = (
    <div className="secondary-block">
      <span>{restaurant.formatted_address}</span>
      <div>
        <span>({restaurant.rating})</span>
        &nbsp;
        <StarRatings
          ignoreInlineStyles={false}
          rating={restaurant.rating}
          starRatedColor="gold"
          starDimension="20px"
          starSpacing="1px"
        ></StarRatings>
      </div>
    </div>
  );

  const onClickLocationCard = async () => {
    const { lat, lng } = restaurant;
    dispatch(selectRestaurant({ restaurant, center: { lat, lng } }));
  };

  return (
    <div className="card-container" onClick={onClickLocationCard}>
      <div className="restaurant-info">
        <h2 className="restaurant-name">{restaurant.name}</h2>
        {secondaryText}
      </div>
      <Divider />
    </div>
  );
};
