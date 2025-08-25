import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, TextField, Typography, Paper, Avatar, InputAdornment, IconButton, Alert, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetStatus } from "./userSlice.js";
import EmailVerification from "./emailVerification.js";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userNameRegex = /^[a-zA-Zא-ת0-9_]{3,20}$/;

const Register = () => {
    const dispatch = useDispatch();
    const { loading, error, success, emailVerificationStep, emailToVerify } = useSelector((state) => state.user);

    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setLocalError("");
        dispatch(resetStatus());
    };

    const handleShowPassword = () => setShowPassword((show) => !show);

    const validate = () => {
        if (!userNameRegex.test(form.userName)) {
            setLocalError("שם משתמש חייב להיות 3-20 תווים, ללא רווחים וללא תווים מיוחדים.");
            return false;
        }
        if (!emailRegex.test(form.email)) {
            setLocalError("כתובת האימייל אינה תקינה.");
            return false;
        }
        if (form.password.length < 6) {
            setLocalError("הסיסמה חייבת להיות לפחות 6 תווים.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        dispatch(registerUser(form));
    };


    if (emailVerificationStep) {
        return <EmailVerification email={emailToVerify} />;
    }
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
                bgcolor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
          

            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: { xs: "90%", sm: "60%", md: "50%" },
                    maxWidth: 500,
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom>
                    הרשמה
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ width: "100%", mt: 2 }}
                >
                    <TextField
                        label="שם משתמש"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        inputProps={{ maxLength: 20 }}
                        error={!!localError && localError.includes("משתמש")}
                        helperText={localError && localError.includes("משתמש") ? localError : ""}
                    />
                    <TextField
                        label="אימייל"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        type="email"
                        error={!!localError && localError.includes("אימייל")}
                        helperText={localError && localError.includes("אימייל") ? localError : ""}
                    />
                    <TextField
                        label="סיסמה"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                        type={showPassword ? "text" : "password"}
                        error={!!localError && localError.includes("סיסמה")}
                        helperText={localError && localError.includes("סיסמה") ? localError : ""}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error && (
                        <Alert severity="error" sx={{ mt: 2, mb: 1, direction: "rtl", width: "100%" }}>
                            {typeof error === "string" ? error : JSON.stringify(error)}
                        </Alert>
                    )}
                    {success && (
                        <Alert severity="success" sx={{ mt: 2, mb: 1, direction: "rtl", width: "100%" }}>
                            {success}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 3, py: 1.5, fontWeight: "bold" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "הרשמה"}
                    </Button>
                </Box>
            </Paper>
        </Box>
        </>
    );
};

export default Register;