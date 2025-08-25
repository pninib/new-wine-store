import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWines } from "./productSlice";
import WineCard from "./card";
import { Box, Grid, Button, Typography, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grape from '../../images/Grape.jpg';

const perPage = 5;

const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wines, loading, error, totalCount } = useSelector((state) => state.product);
  const [page, setPage] = useState(1);

  // נשמור את כל היינות שהובאו

  // בכל שינוי עמוד, נטען עוד יינות
  useEffect(() => {
    dispatch(fetchWines({ page, perPage }));
  }, [dispatch, page]);



  const allWines = [];
  for (let i = 1; i <= page; i++) {
    if (wines[i]) allWines.push(...wines[i]);
  }
  const hasMore = allWines.length < totalCount;


  return (
    <>
      {/* חץ חזרה */}
      <Box sx={{ mt: 1, ml: '3%', display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => navigate('/')} aria-label="back to wines" size="large">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      {/* באנר תמונת רקע וכיתוב */}
      <Box
        sx={{
          mt: 1,
          position: 'relative',
          height: { xs: 180, md: 320 },
          borderRadius: 6, // פינות עגולות יותר
          overflow: 'hidden',
          boxShadow: '0 2px 12px 0 rgba(90,0,12,0.08)', // צל רך ועדין
          mb: 4, // פחות מרווח
          mx: 'auto',
          maxWidth: 1200,
        }}
      >
        <img
          src={Grape}
          alt="כרם יין"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.93) blur(0.5px)' }}
        />
        {/* שכבת overlay עדינה */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(90,0,12,0.10)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '30%', md: '40%' },
            right: { xs: '5%', md: '10%' },
            color: 'white',
            backgroundColor: 'rgba(90, 0, 12, 0.55)',
            padding: { xs: '10px 20px', md: '20px 40px' },
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            maxWidth: 400,
            userSelect: 'none',
            zIndex: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            היינות שלנו
          </Typography>
          <Typography variant="h6">
            כאן תמצאו את כל היינות שלנו – איכות, טעם ויוקרה.
          </Typography>
        </Box>
      </Box>



      <Box sx={{ p: 3 }}>
        {error && <Typography color="error">{error}</Typography>}
        <Grid container spacing={2} justifyContent="center">
          {allWines.map((wine) => (
            <Grid item key={wine._id} xs={12} sm={6} md={3}>
              <WineCard wine={wine} />
            </Grid>
          ))}
        </Grid>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {hasMore && !loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((prev) => prev + 1)}
            >
              הצג עוד
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CardList;