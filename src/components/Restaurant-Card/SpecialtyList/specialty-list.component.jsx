import * as React from "react";
import { Link } from "@mui/material";
import { SpecialtyForm } from "../SpecialtyForm/specialty-form.component";
import "./specialty-list.component.css";

export const SpecialtyList = (props) => {
  const { specialties, onSetSpecialties, placeId } = props;
  const [isEdit, setIsEdit] = React.useState(false);

  const onCancelEdit = () => {
    const storedSpecialties = localStorage.getItem("specialties");
    localStorage.removeItem("specialties");
    onSetSpecialties(JSON.parse(storedSpecialties));
    setIsEdit(false);
  };

  const onCloseEditing = () => {
    setIsEdit(false);
  };

  const onSetEditToTrue = () => {
    const specialtiesToStore = JSON.stringify(specialties);
    localStorage.setItem("specialties", specialtiesToStore);
    setIsEdit(true);
  };

  const list =
    specialties && specialties.length > 0 ? (
      <ul>
        {specialties.map((specialty, i) => (
          <li key={i}>{specialty}</li>
        ))}
      </ul>
    ) : (
      <p>No specialties for this restaurant</p>
    );

  return (
    <>
      <div className="flex-container">
        <h3 className="main-header">Specialties</h3>
        {!isEdit && (
          <Link
            className="get-directions-link edit-link"
            onClick={onSetEditToTrue}
          >
            Edit
          </Link>
        )}
      </div>
      {isEdit ? (
        <SpecialtyForm
          onCancelEdit={onCancelEdit}
          onSetSpecialties={onSetSpecialties}
          specialties={specialties}
          placeId={placeId}
          onCloseEditing={onCloseEditing}
        />
      ) : (
        list
      )}
    </>
  );
};
