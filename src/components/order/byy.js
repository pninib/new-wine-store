import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Marquee = ({ text }) => (
  <Box sx={{
    width: "100%",
    overflow: "hidden",
    bgcolor: "#5a000c",
    color: "#fff",
    py: 1,
    mb: 4,
    borderRadius: 2,
    position: "relative"
  }}>
    <Box
      component="div"
      sx={{
        display: "inline-block",
        whiteSpace: "nowrap",
        animation: "marquee 12s linear infinite",
        fontWeight: 700,
        fontSize: { xs: 18, md: 22 },
        px: 2,
      }}
      children={text}
    />
    <style>
      {`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}
    </style>
  </Box>
);

const CheckoutPage = () => {
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "יש להזין שם";
    if (!form.phone || !/^0\d{8,9}$/.test(form.phone)) errs.phone = "יש להזין טלפון תקין";
    if (!form.address) errs.address = "יש להזין כתובת";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;
    // כאן אפשר לשלוח את ההזמנה לשרת
    alert("ההזמנה התקבלה! שליח בדרך אליך :)");
    navigate("/");
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f9f6f2",
      py: 6,
      px: { xs: 1, md: 0 }
    }}>
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Marquee text="התשלום יתבצע במזומן לשליח 🚚" />
        <Paper elevation={8} sx={{ borderRadius: 5, p: { xs: 2, md: 5 } }}>
          <Typography variant="h4" fontWeight={900} color="primary.main" mb={3} align="center">
            פרטי משלוח
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Stack spacing={3}>
              <TextField
                label="שם מלא"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                variant="outlined"
              />
              <TextField
                label="טלפון"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                variant="outlined"
                inputProps={{ inputMode: "tel", pattern: "[0-9]*" }}
              />
              <TextField
                label="כתובת למשלוח"
                name="address"
                value={form.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ fontWeight: 700, py: 1.5, fontSize: 18, mt: 2 }}
                fullWidth
              >
                סיום והזמן
              </Button>
            </Stack>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default CheckoutPage;