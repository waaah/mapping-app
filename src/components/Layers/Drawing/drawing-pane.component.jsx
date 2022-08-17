import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import RectangleIcon from "@mui/icons-material/Rectangle";
import Button from "@mui/material/Button";
import {
  removeRectangle,
  selectRectangle,
  setAddShape,
} from "../../../store/map/map.slice";
import { useDispatch } from "react-redux";
import Link from "@mui/material/Link";
import { addFilter } from "../../../store/restaurant/restaurant.slice";
import { useEffect } from "react";
import { setCenter } from "../../../store/map/map.slice";

export const DrawingPane = () => {
  const { isAddShape, rectangles } = useSelector((state) => state.map);
  console.log(rectangles);
  const dispatch = useDispatch();
  const boundsData = JSON.stringify(rectangles.map((rect) => rect.bounds));
  useEffect(() => {
    dispatch(
      addFilter({
        coordinates: boundsData === "[]" ? undefined : boundsData,
      })
    );
  }, [boundsData]);
  return (
    <div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {rectangles.length === 0 && (
          <Typography sx={{ fontSize: "0.8rem", textAlign: "center" }}>
            No shapes drawn
          </Typography>
        )}
        {rectangles.map((mapItem, i) => (
          <ListItemButton
            onClick={() => {
              dispatch(setCenter({ center: mapItem.center }));
              dispatch(selectRectangle({ selectedKey: mapItem.key }));
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <RectangleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Rectangle ${i + 1}`}
              secondary={
                <Link
                  onClick={() => {
                    dispatch(removeRectangle({ key: mapItem.key }));
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  Remove Shape
                </Link>
              }
            />
          </ListItemButton>
        ))}
      </List>
      {!isAddShape && (
        <Button
          variant="contained"
          fullWidth
          onClick={() => {
            alert("Please click anywhere on the map to create a new shape");
            dispatch(setAddShape(true));
          }}
        >
          Enable Draw Mode
        </Button>
      )}
      {isAddShape && (
        <Button
          variant="contained"
          fullWidth
          onClick={() => dispatch(setAddShape(false))}
        >
          Cancel Draw Mode
        </Button>
      )}
    </div>
  );
};
