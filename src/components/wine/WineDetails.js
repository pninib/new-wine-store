import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, Stack, Chip, Divider, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch } from "react-redux";

import { motion } from "framer-motion";
import axios from "axios";
import { addToOrder } from "../order/orderSlice";

const MotionPaper = motion(Paper);

const WineDetails = () => {
    const { id } = useParams();
    const [wine, setWine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3002/api/product/${id}`)
            .then(res => {
                setWine(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response?.data || "שגיאה בטעינת היין");
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" align="center" mt={8}>{error}</Typography>;
    if (!wine) return null;

    return (

        <>
            <Box sx={{ marginLeft: '20%', marginTop: '1%', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => navigate('/wines')} aria-label="back to wines" size="large">
                    <ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "80vh", bgcolor: "rgb(252, 244, 244)", py: 6 }}>
                <MotionPaper
                    elevation={8}
                    initial={{ opacity: 0, scale: 0.96, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        maxWidth: 900,
                        borderRadius: 5,
                        overflow: "hidden",
                        bgcolor: "#fff",
                    }}
                >
                    <Box sx={{ minWidth: 350, bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                            src={wine.imgUrl}
                            alt={wine.name}
                            style={{ width: "100%", maxWidth: 350, maxHeight: 420, objectFit: "cover", borderRadius: 0 }}
                        />
                    </Box>
                    <Box sx={{ p: 5, flex: 1 }}>
                        {/* שם היין */}
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                            <Typography variant="h4" fontWeight={900} color="primary.main">
                                {wine.name}
                            </Typography>
                        </Stack>
                        {/* חברה */}
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                            <Typography variant="h6" color="text.secondary">
                                {wine.company}
                            </Typography>
                        </Stack>
                        {/* סוג */}
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                            <Chip label={wine.type} color="primary" size="medium" sx={{ fontWeight: 700 }} />
                        </Stack>
                        {/* מחיר */}
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                            <Typography variant="h5" color="primary.main" fontWeight={700}>
                                {wine.price} ₪
                            </Typography>
                        </Stack>
                        {/* תאריך */}
                        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                            <Typography variant="body1" color="text.secondary">
                                {wine.productionDate && new Date(wine.productionDate).toLocaleDateString("he-IL")}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1" color="text.secondary" sx={{ minHeight: 60, fontSize: 18 }}>
                            {wine.story}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 4, fontWeight: 700, fontSize: 20, borderRadius: 3, px: 5, boxShadow: 3 }}
                            onClick={() => dispatch(addToOrder(wine))}
                        >
                            הוסף לעגלה
                        </Button>
                    </Box>
                </MotionPaper>
            </Box>
        </>
    );
};

export default WineDetails;