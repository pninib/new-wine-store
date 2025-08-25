import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from "./userSlice.js";
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Dialog, Button, DialogActions, IconButton, DialogContent, DialogTitle, DialogContentText, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const AllUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, usersLoading, usersError } = useSelector((state) => state.user);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedUserId, setSelectedUserId] = React.useState(null);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const handleDeleteClick = (userId) => {
        setSelectedUserId(userId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        dispatch(deleteUser(selectedUserId)).then(() => {
            dispatch(fetchAllUsers());
        });
        setOpenDialog(false);
        setSelectedUserId(null);
    };

    const handleCancel = () => {
        setOpenDialog(false);
        setSelectedUserId(null);
    };
    const handleBack = () => { navigate('/'); };


    return (
        <>
            <Box sx={{ marginLeft: '27%', marginTop: '3%', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleBack} aria-label="back to home" size="large">
                    < ArrowForwardIosIcon />
                </IconButton>
            </Box>
            <Typography variant="h6" mb={2} sx={{ textAlign: "left", color: '#414141', marginLeft: '28%', marginTop: '2px', fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"' }}> כל המשתמשים</Typography>

            <Paper style={{ width: '40%', marginRight: '28%', marginTop: '3%' }}>

                {usersLoading && <CircularProgress />}
                {usersError && <Typography color="error">{usersError}</Typography>}

                {!usersLoading && !usersError && users.length > 0 && (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', fontSize:'large' }}>
                                <TableCell>שם</TableCell>
                                <TableCell><EmailOutlinedIcon /></TableCell>
                                <TableCell>תפקיד</TableCell>
                                <TableCell>תאריך יצירה</TableCell>
                                <TableCell>פעולות</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (

                                <TableRow key={user._id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#fff1f1',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                        },
                                    }}>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString('he-IL')}</TableCell>
                                    <TableCell><IconButton color="error" onClick={() => handleDeleteClick(user._id)}><DeleteIcon /> </IconButton></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {!usersLoading && users.length === 0 && (
                    <Typography>לא נמצאו משתמשים</Typography>
                )}
                <Dialog open={openDialog} onClose={handleCancel}>
                    <DialogTitle>מחיקת משתמש</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            האם את בטוחה שאת רוצה למחוק את המשתמש? פעולה זו אינה הפיכה.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            ביטול
                        </Button>
                        <Button onClick={handleConfirmDelete} color="error">
                            מחק
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </>
    );
};

export default AllUsers;
