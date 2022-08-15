import * as React from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import "./restaurant-card.component.css";
import StarRatings from "react-star-ratings";
import { getLocation } from "../../services/location";
import {
  closeRestaurant,
  setOriginAndDestination,
} from "../../store/selected-location/selected-location.slices";
import { Link } from "@mui/material";
import { getRestaurantData } from "../../services/restaurant";
import { SpecialtyList } from "./SpecialtyList/specialty-list.component";
import _ from "lodash";
import { Category } from "./Category/category.component";
import ClearIcon from "@mui/icons-material/Clear";

export const RestaurantCard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.selectedLocation);
  const [additionalInfo, setAdditionalInfo] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getAdditionalInfo = async () => {
      if (restaurant) {
        setIsLoading(true);
        const info = await getRestaurantData(restaurant.place_id);
        localStorage.setItem("category", info.category);
        localStorage.setItem("specialties", JSON.stringify(info.specialties));
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setAdditionalInfo(info);
        setIsLoading(false);
      }
    };
    getAdditionalInfo();
  }, [restaurant]);

  const getDirections = async () => {
    const origin = await getLocation();
    const { lat, lng } = restaurant;
    const destination = { lat, lng };
    dispatch(setOriginAndDestination({ origin, destination }));
  };

  const onSetSpecialties = (specialties) => {
    setAdditionalInfo((state, prevState) => ({
      ...prevState,
      specialties,
    }));
  };

  const onSetCategory = (category) => {
    setAdditionalInfo((state, prevState) => ({
      ...prevState,
      category,
    }));
  };

  const onCloseCard = () => {
    dispatch(closeRestaurant());
  };

  if (!restaurant) return null;

  // const photoReference = _.get(restaurant, "photos[0].photo_reference");

  return (
    <Card
      className="detached-card"
      sx={{ maxWidth: 400, width: "100%", display: "flex" }}
    >
      <div className="clear-icon" onClick={onCloseCard}>
        <ClearIcon />
      </div>
      {isLoading ? (
        <CircularProgress sx={{ margin: "auto" }} />
      ) : (
        <RestaurantCardContent
          restaurant={restaurant}
          additionalInfo={additionalInfo}
          onSetCategory={onSetCategory}
          onSetSpecialties={onSetSpecialties}
          getDirections={getDirections}
        />
      )}
    </Card>
  );
};

const RestaurantCardContent = (props) => {
  const {
    restaurant,
    additionalInfo,
    onSetCategory,
    onSetSpecialties,
    getDirections,
  } = props;
  return (
    <>
      <CardContent sx={{ m: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography gutterBottom>
          <span>({restaurant.rating})</span>
          &nbsp;
          <StarRatings
            ignoreInlineStyles={false}
            rating={restaurant.rating}
            starRatedColor="gold"
            starDimension="20px"
            starSpacing="1px"
          ></StarRatings>
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <Typography gutterBottom variant="span">
            Address: {restaurant.formatted_address}
          </Typography>
        </Typography>
        <Typography sx={{ mb: 2 }} variant="body2" color="text.secondary">
          <Category
            onSetCategory={onSetCategory}
            category={additionalInfo.category}
            placeId={restaurant.place_id}
          />
        </Typography>
        <Divider />
        <Typography variant="body2" color="text.secondary">
          {additionalInfo && restaurant && (
            <SpecialtyList
              specialties={additionalInfo.specialties}
              onSetSpecialties={onSetSpecialties}
              placeId={restaurant.place_id}
            />
          )}
        </Typography>
        <Button variant="contained" onClick={getDirections}>
          Get Directions
        </Button>
      </CardContent>
    </>
  );
};
