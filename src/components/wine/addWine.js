import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWine } from "./productSlice";
import { Box, TextField, Button, MenuItem, Paper, Typography, InputAdornment, IconButton } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const wineTypes = [
  'אדום יבש', 'חצי יבש', 'מבעבע', 'מתוק', 'וודקה', 'וויסקי', 'רוזה', 'קינוח', 'לבן'
];

const AddWineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.product);
  const [form, setForm] = useState({
    name: "",
    company: "",
    type: "",
    price: "",
    imgUrl: "",
    story: "",
    productionDate: "",
  });




  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sending wine:", form);
    dispatch(addWine(form));
    setForm({
      name: "",
      company: "",
      type: "",
      price: "",
      imgUrl: "",
      story: "",
      productionDate: "",
    });
  };
  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <Box sx={{ marginLeft: '31%', marginTop: '3%', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleBack} aria-label="back to home" size="large">
          < ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Typography variant="h6" mb={2} sx={{ textAlign: "left", color: '#414141', marginLeft: '32%', marginTop: '2px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}>הוספת יין</Typography>
      <Paper sx={{ p: 2, mb: 2, width: '34%', margin: 'auto', textAlign: 'right', marginTop: '3%' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>

          <Box sx={{ display: "flex" }}>
            <TextField name="name" label="שם" slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <WineBarOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }} value={form.name} onChange={handleChange} required sx={{ marginRight: 3, marginLeft: 3.5, width: '42.7%' }} />
            <TextField name="company" label="יקב" slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AddBusinessOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }} value={form.company} onChange={handleChange} sx={{ width: '42.7%' }} />
          </Box>

          <Box sx={{ display: "flex" }}>
            <TextField select name="type" label="סוג" value={form.type} onChange={handleChange} required sx={{ marginRight: 3, marginLeft: 3.5, width: '42.7%' }}>
              {wineTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
            </TextField>
            <TextField name="price" label="מחיר" type="number"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SellOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }} value={form.price} onChange={handleChange} sx={{ width: '42.7%' }} />
          </Box>

          <Box sx={{ display: "flex" }}>
            <TextField name="imgUrl" label="קישור לתמונה" value={form.imgUrl}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AddPhotoAlternateOutlinedIcon />
                    </InputAdornment>
                  ),
                },
              }}
              onChange={handleChange} sx={{ marginLeft: 3.5, marginRight: 3, width:'42.7%' }} />
            <TextField name="productionDate" label="תאריך ייצור" type="date" value={form.productionDate} onChange={handleChange} InputLabelProps={{ shrink: true }} sx={{ width: '42.7%' }} />
          </Box>
          <TextField id="outlined-multiline-static" label="סיפור" name="story" 
            value={form.story} 
            onChange={handleChange}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <DriveFileRenameOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }} multiline rows={6} sx={{  marginLeft: 3.5, width:'90%' }} />
          <Button type="submit" variant="contained" disabled={loading} sx={{ width: '90%', marginLeft: 3.5, marginBottom: '5%', borderRadius: '15px' }}>הוסף</Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Paper >
    </>
  );
};

export default AddWineForm;