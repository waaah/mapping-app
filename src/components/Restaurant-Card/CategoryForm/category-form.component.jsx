import * as React from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { setCategory } from "../../../services/restaurant";
import { categoriesData } from "../../../data/category";

export const CategoryForm = (props) => {
  const { category, onCancelEdit, onSetCategory, placeId, onCloseEditing } =
    props;

  const onSaveCategory = async () => {
    await setCategory(placeId, {
      category,
    });
    onSetCategory(category);
    onCloseEditing();
  };

  return (
    <>
      <FormControl style={{ marginTop: "1em" }} fullWidth>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputLabel fullWidth htmlFor="my-input">
              Category
            </InputLabel>
            <Select
              fullWidth
              labelId={`${category}-label`}
              id={category}
              value={category}
              label={category}
              onChange={(event) => onSetCategory(event.target.value)}
            >
              {categoriesData.map((currentCategory) => (
                <MenuItem value={currentCategory}>{currentCategory}</MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </FormControl>
      <FormControl style={{ marginTop: "1em" }} fullWidth>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={onSaveCategory}>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={onCancelEdit}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};
