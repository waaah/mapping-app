import { useState } from "react";
import { CategoryForm } from "../CategoryForm/category-form.component";
import { Link } from "@mui/material";

export const Category = (props) => {
  const { onSetCategory, category, placeId } = props;
  const [isEdit, setIsEdit] = useState(false);

  const onCancelEdit = () => {
    const category = localStorage.getItem("category");
    localStorage.removeItem("category");
    onSetCategory(category);
    setIsEdit(false);
  };

  const onCloseEditing = () => {
    setIsEdit(false);
  };

  const onSetEditToTrue = () => {
    localStorage.setItem("category", category);
    setIsEdit(true);
  };

  return (
    <>
      <div className="flex-container">
        <span className="main-header">Restaurant Type: </span>
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
        <CategoryForm
          onCancelEdit={onCancelEdit}
          onSetCategory={onSetCategory}
          category={category}
          placeId={placeId}
          onCloseEditing={onCloseEditing}
        />
      ) : (
        <span>{category}</span>
      )}
    </>
  );
};
