import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, IconButton, Divider, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { increaseQuantity, decreaseQuantity, removeFromOrder, closeOrder } from "./orderSlice.js";

const CartPopup = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector(state => state.order);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        right: 24,
        top: 24,
        width: 300,
        bgcolor: "#fff",
        boxShadow: 6,
        borderRadius: 4,
        zIndex: 2000,
        p: 3,
        minHeight: 120,
        maxHeight: "80vh",
        overflowY: "auto"
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>עגלת קניות</Typography>
        <IconButton onClick={() => dispatch(closeOrder())}><CloseIcon /></IconButton>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {items.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          עגלת קניות ריקה<br />רוץ למלא אותה!
        </Typography>
      ) : (
        <>
          {items.map(item => (
            <Box key={item._id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <img src={item.imgUrl} alt={item.name} width={48} height={48} style={{ borderRadius: 8, marginLeft: 12 }} />
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography color="text.secondary" fontSize={14}>{item.price} ₪</Typography>
              </Box>
              <IconButton size="small" onClick={() => dispatch(decreaseQuantity(item._id))}><RemoveIcon /></IconButton>
              <Typography mx={1}>{item.quantity}</Typography>
              <IconButton size="small" onClick={() => dispatch(increaseQuantity(item._id))}><AddIcon /></IconButton>
            </Box>
          ))}
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={700} fontSize={18} align="center">
            סה"כ: {total} ₪
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ textAlign: "center" }}>
            <IconButton size="large"></IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartPopup;