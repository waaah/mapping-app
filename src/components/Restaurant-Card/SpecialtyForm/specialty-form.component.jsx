import * as React from "react";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { setSpecialties } from "../../../services/restaurant";

export const SpecialtyForm = (props) => {
  const {
    specialties,
    onCancelEdit,
    onSetSpecialties,
    placeId,
    onCloseEditing,
  } = props;

  if (specialties.length === 0) {
    specialties.push("");
  }

  const onSaveSpecialties = async () => {
    const specData = specialties.filter((specialty) => specialty !== "");
    await setSpecialties(placeId, {
      specialties: specData,
    });
    onSetSpecialties(specData);
    onCloseEditing();
  };

  const onAddNewSpecialty = () => {
    specialties.push("");
    onSetSpecialties(specialties);
  };

  const onSetSpecialtyItem = (value, currentIndex) => {
    specialties[currentIndex] = value;
    onSetSpecialties(specialties);
  };

  const onRemoveSpecialtyItem = (index) => {
    if (specialties.length === 1) return;
    const newItems = specialties.splice(index);
    onSetSpecialties(newItems);
  };

  return (
    <>
      {specialties.map((item, index) => (
        <FormControl style={{ marginTop: "1em" }} fullWidth>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <InputLabel fullWidth htmlFor="my-input">
                Specialty Name
              </InputLabel>
              <Input
                value={item}
                onChange={(event) =>
                  onSetSpecialtyItem(event.target.value, index)
                }
                fullWidth
                id="my-input"
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={() => onRemoveSpecialtyItem(index)}
                fullWidth
                variant="contained"
              >
                X
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      ))}
      <FormControl style={{ marginTop: "1em" }} fullWidth>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={onSaveSpecialties}>
              Save
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={onAddNewSpecialty}>
              Add
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={onCancelEdit}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </>
  );
};
