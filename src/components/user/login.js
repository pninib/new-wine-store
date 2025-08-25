import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetStatus } from "./userSlice";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    IconButton
} from "@mui/material";

const Login = () => {
    const [form, setForm] = useState({ userName: "", email: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success, user } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            navigate("/"); // אחרי התחברות נשלח לדף הבית
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        dispatch(resetStatus());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };
    const handleBack = () => { navigate('/'); };


    return (
        <>
       <Box sx={{ marginLeft: '27%', marginTop: '3%', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleBack} aria-label="back to home" size="large">
                    < ArrowForwardIosIcon />
                </IconButton>
            </Box>

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#f5f5f5"
            }}
        >
            

            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 350,
                    width: "100%",
                    borderRadius: 3
                }}
            >
                <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" mb={2}>
                    התחברות
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="שם משתמש"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="אימייל"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 1 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "התחבר"}
                    </Button>
                </form>
            </Paper>
        </Box>
        </>
    );
};

export default Login;
