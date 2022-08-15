import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { getRestaurantsByFilter } from "../../../store/restaurant/restaurant.slice";
import { categoriesData } from "../../../data/category";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const LayerPane = (props) => {
  const { isShowPane } = props;
  const [checkedItems, setCheckedItems] = useState([]);
  const dispatch = useDispatch();
  const restaurantTypes = categoriesData;

  const onHandleChange = (event) => {
    const checkValue = event.target.name;
    let newItems = [];
    if (checkedItems.includes(checkValue)) {
      newItems = checkedItems.filter(
        (currentItem) => currentItem !== checkValue
      );
    } else {
      newItems = [...checkedItems, checkValue];
    }
    setCheckedItems(newItems);
    dispatch(getRestaurantsByFilter({ category: newItems }));
  };

  const isChecked = (value) => {
    const isValueChecked = checkedItems.includes(value);
    return isValueChecked;
  };

  return (
    <Card
      className={`${!isShowPane && "layers--card-hide"} layers--card`}
      sx={{ minWidth: 275 }}
    >
      <CardContent>
        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
          <FormLabel component="legend">Restaurant Types</FormLabel>
          <FormGroup>
            {restaurantTypes.map((type) => (
              <FormControlLabel
                key={type}
                sx={{ fontSize: "0.2em" }}
                control={
                  <Checkbox
                    checked={isChecked(type)}
                    onChange={onHandleChange}
                    name={type}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
};
