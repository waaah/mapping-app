import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import StarRatings from "react-star-ratings";
import "./restaurant-card.component.css";

export const RestaurantCard = (props) => {
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
  console.log(restaurant);
  return (
    <div className="card-container">
      <div className="restaurant-info">
        <h2 className="restaurant-name">{restaurant.name}</h2>
        {secondaryText}
      </div>
      <Divider />
    </div>
  );
  // return <div>{restaurant.name}</div>;
};
