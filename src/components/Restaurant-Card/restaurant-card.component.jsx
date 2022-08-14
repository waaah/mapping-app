import * as React from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
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
import { getLocationImage } from "../../services/places";
import { getRestaurantData } from "../../services/restaurant";
import { SpecialtyList } from "./SpecialtyList/specialty-list.component";
import _ from "lodash";
import { Category } from "./Category/category.component";
import ClearIcon from "@mui/icons-material/Clear";

export const RestaurantCard = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.selectedLocation);
  const [additionalInfo, setAdditionalInfo] = React.useState({
    specialties: [],
    category: null,
  });

  React.useEffect(() => {
    const getAdditionalInfo = async () => {
      if (restaurant) {
        const info = await getRestaurantData(restaurant.place_id);
        localStorage.setItem("category", info.category);
        localStorage.setItem("specialties", JSON.stringify(info.specialties));
        setAdditionalInfo(info);
      }
    };
    getAdditionalInfo();
  }, [restaurant]);

  if (!restaurant) return null;

  const photoReference = _.get(restaurant, "photos[0].photo_reference");

  const getDirections = async () => {
    const origin = await getLocation();
    const destination = restaurant.geometry.location;
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

  return (
    <Card className="detached-card" sx={{ maxWidth: 400 }}>
      <div className="clear-icon" onClick={onCloseCard}>
        <ClearIcon />
      </div>
      {/* {photoReference && (
        <CardMedia
          component="img"
          alt="restaurant-banner"
          height="200"
          image={getLocationImage(photoReference)}
        />
      )} */}
      <CardContent>
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
            Address:
          </Typography>
          <Typography gutterBottom variant="p">
            {restaurant.formatted_address}
          </Typography>
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <Category
            onSetCategory={onSetCategory}
            category={additionalInfo.category}
            placeId={restaurant.place_id}
          />
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          <Link className="get-directions-link" onClick={getDirections}>
            Get Directions
          </Link>
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
      </CardContent>
    </Card>
  );
};
