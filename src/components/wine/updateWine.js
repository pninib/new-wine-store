import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateWine } from "./productSlice";
import { Box, TextField, Button, MenuItem, Paper, Typography } from "@mui/material";

const wineTypes = [
  'אדום יבש', 'חצי יבש', 'מבעבע', 'מתוק', 'וודקה', 'וויסקי', 'רוזה', 'קינוח', 'לבן'
];

const UpdateWineForm = ({ wine, onFinish }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.product);
  const [form, setForm] = useState({ ...wine });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateWine({ wineid: wine._id, wine: form }));
    if (onFinish) onFinish();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" mb={2}>עדכון יין</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField name="name" label="שם" value={form.name} onChange={handleChange} required />
        <TextField name="company" label="חברה" value={form.company} onChange={handleChange} />
        <TextField
          select
          name="type"
          label="סוג"
          value={form.type}
          onChange={handleChange}
          required
        >
          {wineTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
        </TextField>
        <TextField name="price" label="מחיר" type="number" value={form.price} onChange={handleChange} />
        <TextField name="imgUrl" label="קישור לתמונה" value={form.imgUrl} onChange={handleChange} />
        <TextField name="story" label="סיפור" value={form.story} onChange={handleChange} />
        <TextField name="productionDate" label="תאריך ייצור" type="date" value={form.productionDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" disabled={loading}>עדכן</Button>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Paper>
  );
};

export default UpdateWineForm;