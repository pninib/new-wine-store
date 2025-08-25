import React, { useRef, useState } from "react";
import { Box, TextField, Button, Typography, Paper, Alert, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, resetStatus } from "./userSlice";

const OTP_LENGTH = 6;

const EmailVerification = ({ email }) => {
    const dispatch = useDispatch();
    const { loading, error, success, emailVerified } = useSelector((state) => state.user);
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (e, idx) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        if (!value) return;
        const newOtp = [...otp];
        newOtp[idx] = value[0];
        setOtp(newOtp);
        if (idx < OTP_LENGTH - 1 && value) {
            inputsRef.current[idx + 1].focus();
        }
        dispatch(resetStatus());
    };

    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputsRef.current[idx - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData("text").slice(0, OTP_LENGTH).split("");
        setOtp((prev) => prev.map((_, i) => paste[i] || ""));
        setTimeout(() => {
            const nextEmpty = paste.length < OTP_LENGTH ? paste.length : OTP_LENGTH - 1;
            inputsRef.current[nextEmpty].focus();
        }, 10);
        dispatch(resetStatus());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyEmail({ email, code: otp.join("") }));
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={6} sx={{ p: 4, maxWidth: 400, borderRadius: 5, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    אימות כתובת אימייל
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    הזן את הקוד שנשלח לכתובת <b>{email}</b>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
                        {otp.map((digit, idx) => (
                            <TextField
                                key={idx}
                                inputRef={el => inputsRef.current[idx] = el}
                                value={digit}
                                onChange={e => handleChange(e, idx)}
                                onKeyDown={e => handleKeyDown(e, idx)}
                                onPaste={handlePaste}
                                inputProps={{
                                    maxLength: 1,
                                    style: { width: 36, textAlign: "center", fontSize: 24 }
                                }}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading || otp.some(d => !d) || emailVerified}>
                        {loading ? <CircularProgress size={24} /> : "אמת קוד"}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default EmailVerification;