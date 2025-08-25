import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, IconButton, Divider, Button, Stack, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { increaseQuantity, decreaseQuantity, removeFromOrder, clearOrder } from "./orderSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.order.items);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f9f6f2",
      py: 6,
      px: { xs: 1, md: 0 }
    }}>
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Paper elevation={8} sx={{ borderRadius: 5, p: { xs: 2, md: 5 }, mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <IconButton onClick={() => navigate(-1)} size="large">
              <ArrowForwardIosIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={900} color="primary.main">
              עגלת קניות
            </Typography>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          {items.length === 0 ? (
            <Typography color="text.secondary" align="center" sx={{ mt: 6, fontSize: 22 }}>
              עגלת הקניות שלך ריקה<br />הוסף מוצרים כדי להתחיל קניה!
            </Typography>
          ) : (
            <>
              {items.map(item => (
                <Box key={item._id} sx={{
                  display: "flex", alignItems: "center", mb: 3, p: 2, borderRadius: 3,
                  bgcolor: "#fff", boxShadow: 1
                }}>
                  <img src={item.imgUrl} alt={item.name} width={64} height={64} style={{ borderRadius: 8, marginLeft: 16 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} fontSize={18}>{item.name}</Typography>
                    <Typography color="text.secondary" fontSize={15}>{item.price} ₪</Typography>
                  </Box>
                  <IconButton size="small" onClick={() => dispatch(decreaseQuantity(item._id))}><RemoveIcon /></IconButton>
                  <Typography mx={1} fontWeight={700}>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => dispatch(increaseQuantity(item._id))}><AddIcon /></IconButton>
                  {/* <IconButton size="small" color="error" onClick={() => dispatch(removeFromOrder(item._id))}><DeleteIcon /></IconButton> */}
                </Box>
              ))}
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight={700} fontSize={22}>סה"כ לתשלום:</Typography>
                <Typography fontWeight={900} fontSize={26} color="primary.main">{total} ₪</Typography>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" color="error" onClick={() => dispatch(clearOrder())}>
                  נקה עגלה
                </Button>
                <Button variant="contained" color="primary" size="large" sx={{ fontWeight: 700, px: 5 }} onClick={() => navigate('/checkout')}>
                  לתשלום
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CartPage;