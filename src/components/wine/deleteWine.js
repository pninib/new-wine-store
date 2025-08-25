import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWine } from "./productSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteWine = ({ wineid }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.product);

  const handleDelete = () => {
    if (window.confirm("האם למחוק את היין?")) {
      dispatch(deleteWine(wineid));
    }
  };

  return (
    <IconButton color="error" onClick={handleDelete} disabled={loading}>
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteWine;