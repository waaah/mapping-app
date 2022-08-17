import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addFilter } from "../../../store/restaurant/restaurant.slice";
import { categoriesData } from "../../../data/category";

export const FiltersPane = () => {
  const dispatch = useDispatch();
  const restaurantTypes = categoriesData;
  const [checkedItems, setCheckedItems] = useState([]);

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
    dispatch(addFilter({ category: newItems }));
  };

  const isChecked = (value) => {
    const isValueChecked = checkedItems.includes(value);
    return isValueChecked;
  };
  return (
    <div>
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
    </div>
  );
};
