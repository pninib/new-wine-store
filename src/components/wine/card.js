import React, { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateWineForm from "./updateWine";
import { deleteWine } from "./productSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToOrder, openOrder } from "../order/orderSlice";

const CardMotion = motion(Card);

const WineCard = ({ wine }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const orderItems = useSelector((state) => state.order.items);

  const [editOpen, setEditOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loginDialog, setLoginDialog] = useState(false);
  const [cartDialog, setCartDialog] = useState(false);

  const handleDelete = () => {
    dispatch(deleteWine(wine._id));
    setDeleteDialog(false);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      setLoginDialog(true);
    } else {
      dispatch(addToOrder(wine));
      setCartDialog(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CardMotion
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(90,0,12,0.25)" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        sx={{
          width: "100%",
          maxWidth: { xs: 520, md: 1040 },
          borderRadius: 4,
          boxShadow: "0 4px 24px 0 rgba(90,0,12,0.10)",
          bgcolor: "#fffdf7",
          m: 2,
          overflow: "hidden",
          position: "relative",
          transition: "max-width 0.3s",
        }}
      >
        {wine.imgUrl && (
          <CardMedia
            component="img"
            height={window.innerWidth >= 900 ? 360 : 180}
            image={wine.imgUrl}
            alt={wine.name}
            sx={{
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottom: "1px solid #eee",
              width: "100%",
              transition: "height 0.3s",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/wine/${wine._id}`)}
          />
        )}
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={1}>
            <Typography variant="h6" fontWeight={700} color="primary.main">
              {wine.name}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="body2" color="text.secondary">
              {wine.company}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Chip label={wine.type} color="secondary" size="small" sx={{ fontWeight: 600 }} />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <Typography variant="body1" color="primary.main" fontWeight={600}>
              {wine.price} ₪
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
            <CalendarMonthIcon fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {wine.productionDate && new Date(wine.productionDate).toLocaleDateString("he-IL")}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <IconButton
              color="primary"
              size="small"
              onClick={handleAddToCart}
              sx={{
                // bgcolor: "#f2c9c9",
                color: "#5a000c",
                // borderRadius: 3,
                // boxShadow: 2,
                '&:hover': { bgcolor: "#e0b5a9" }
              }}
            >
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
          </Box>
        </CardContent>
        {user?.role === "ADMIN" && (
          <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 1, zIndex: 2 }}>
            <IconButton
              size="small"
              color="primary"
              onClick={e => { e.stopPropagation(); setEditOpen(true); }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={e => { e.stopPropagation(); setDeleteDialog(true); }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </CardMotion>
      {/* דיאלוג מחיקה */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>מחיקת יין</DialogTitle>
        <DialogContent>
          האם אתה בטוח שברצונך למחוק את היין "{wine.name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="primary">ביטול</Button>
          <Button onClick={handleDelete} color="error" variant="contained">מחק</Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג עדכון */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>עדכון יין</DialogTitle>
        <DialogContent>
          <UpdateWineForm wine={wine} onClose={() => setEditOpen(false)} />
        </DialogContent>
      </Dialog>
      {/* דיאלוג למשתמש לא מחובר */}
      <Dialog open={loginDialog} onClose={() => setLoginDialog(false)}>
        <DialogTitle>המשך קניה</DialogTitle>
        <DialogContent>
          <Typography>עליך להתחבר או להירשם כדי להוסיף לעגלה.</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="contained" onClick={() => { setLoginDialog(false); navigate('/login'); }}>התחברות</Button>
            <Button variant="outlined" onClick={() => { setLoginDialog(false); navigate('/signup'); }}>הרשמה</Button>
          </Box>
        </DialogContent>
      </Dialog>
      {/* דיאלוג המשך קניה */}
      <Dialog open={cartDialog} onClose={() => setCartDialog(false)}>
        <DialogTitle>המשך קניה</DialogTitle>
        <DialogContent>
          <Typography>המוצר נוסף לעגלה!</Typography>
          <Box sx={{ my: 2 }}>
            {orderItems.map(item => (
              <Box key={item._id} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <img src={item.imgUrl} alt={item.name} width={32} height={32} style={{ borderRadius: 4, marginLeft: 8 }} />
                <Typography sx={{ flex: 1 }}>{item.name}</Typography>
                <Typography>{item.quantity} x {item.price} ₪</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setCartDialog(false);
                navigate("/cart"); // מעבר לעגלת קניות הגדולה בלבד
              }}
            >
              לתשלום
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCartDialog(false);
                dispatch(openOrder()); // פותח רק את העגלה המוקטנת
              }}
            >
              המשך קניה
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default WineCard;