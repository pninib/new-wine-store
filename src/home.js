
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, Button, Popover, Typography, IconButton, Stack, Tooltip, Fade } from '@mui/material';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LiquorIcon from '@mui/icons-material/Liquor';
import { logout, getCurrentUser } from './components/user/userSlice';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import grapeField from './images/Grape field.jpg';
import { openOrder } from './components/order/orderSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: '#c49a6c',
    color: '#fff',
    fontWeight: 'bold'
  },
}));

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);
  const cartCount = useSelector(state => state.order.items.reduce((sum, item) => sum + item.quantity, 0));


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser()).unwrap().catch(() => {
        dispatch(logout());
      });
    }
  }, [dispatch, token, user]);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <>
      {/* ===== AppBar מעוצב מודרני ===== */}
      <AppBar
        position="static"
        elevation={2}
        sx={{
          backgroundColor: '#5a000c', // בורדו עמוק
          color: '#fff',
          height: 80,
          px: { xs: 2, md: 8 },
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1200, width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Button
              sx={{ color: '#f2c9c9', fontSize: '1.3rem', fontWeight: '700' }}
              startIcon={<LiquorIcon />}
              onClick={() => navigate('/wines')}
            >
              מוצרים
            </Button>
            {cartCount > 0 && (
              <IconButton aria-label='cart' sx={{ ml: 1 }} onClick={() => dispatch(openOrder())}>
                <StyledBadge badgeContent={cartCount} color="secondary" showZero>
                  <ShoppingCartIcon sx={{ fontSize: 32, color: '#f2c9c9' }} />
                </StyledBadge>
              </IconButton>
            )}
            {!user && (
              <>
                <IconButton
                  onClick={handleOpenPopover}
                  sx={{
                    color: '#f2c9c9',
                    '&:hover': { color: '#f9b5b5', transform: 'scale(1.1)' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <PersonPinIcon fontSize="large" />
                </IconButton>

                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  TransitionComponent={Fade}
                  PaperProps={{
                    sx: {
                      p: 4,
                      borderRadius: 4,
                      maxWidth: 360,
                      bgcolor: '#fff1f1',
                      boxShadow: '0 8px 16px rgba(90,0,12,0.3)',
                      color: '#5a000c',
                      fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    },
                  }}
                >
                  <Typography variant="h5" mb={2} fontWeight="bold">
                    היי, נעים לראות אותך!
                  </Typography>
                  <Typography variant="body1" mb={3}>
                    כבר רשום לאתר? התחבר כאן או הירשם אם אתה חדש.
                  </Typography>

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      startIcon={<LoginIcon />}
                      sx={{
                        px: 3,
                        fontWeight: 'bold',
                        bgcolor: '#5a000c',
                        '&:hover': { bgcolor: '#7a0010' },
                      }}
                      onClick={() => {
                        handleClosePopover();
                        navigate('/login');
                      }}
                    >
                      התחבר
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<HowToRegIcon />}
                      sx={{
                        px: 3,
                        fontWeight: 'bold',
                        borderColor: '#5a000c',
                        color: '#5a000c',
                        '&:hover': {
                          borderColor: '#7a0010',
                          backgroundColor: '#f9b5b5',
                          color: '#7a0010',
                        },
                      }}
                      onClick={() => {
                        handleClosePopover();
                        navigate('/sigin');
                      }}
                    >
                      הרשמה
                    </Button>
                  </Stack>
                </Popover>
              </>
            )}

            {user?.role === 'ADMIN' && (
              <>
                <Button
                  sx={{
                    color: '#f2c9c9',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    '&:hover': { color: '#f9b5b5' },
                  }}
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => navigate('/addWine')}
                >
                  הוספת מוצר
                </Button>
                <Button
                  sx={{
                    color: '#f2c9c9',
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    '&:hover': { color: '#f9b5b5' },
                  }}
                  startIcon={<PeopleAltIcon />}
                  onClick={() => navigate('/allUsers')}
                >
                  כל המשתמשים
                </Button>
              </>
            )}

            {user && (
              <>
                <Typography
                  sx={{
                    mx: 2,
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    color: '#f2c9c9',
                    mr: '400px',
                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  }}
                >
                  שלום, {user.userName}
                </Typography>
                <Tooltip title="יציאה">
                  <Button
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{
                      color: '#f2c9c9',
                      fontSize: '1.2rem',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: '#7a0010',
                        color: '#fff',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    יציאה
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* ===== דף הבית עם באנר ותוכן ===== */}
      <Box
        sx={{
          mt: 4,
          maxWidth: 1200,
          mx: 'auto',
          px: 3,
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        {/* באנר עם תמונת שדה יין */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 250, md: 440 },
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            mb: 6,
          }}
        >
          <img
            src={grapeField}
            alt="שדה יין"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onClick={() => navigate('/wines')}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              right: '5%',
              color: 'white',
              backgroundColor: 'rgba(90, 0, 12, 0.7)',
              padding: '20px 40px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              maxWidth: 400,
              userSelect: 'none',
            }}
            onClick={() => navigate('/wines')}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              חווית היין האולטימטיבית
            </Typography>
            <Typography variant="h6">
              בואו לגלות את מבחר היינות המעולים שלנו – טעם, איכות ויוקרה במקום אחד.
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: '#f2c9c9',
                color: '#5a000c',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#e0b5a9' },
              }}
              onClick={() => navigate('/wines')}
            >
              קנה עכשיו
            </Button>
          </Box>
        </Box>

        {/* כותרת מרכזית */}
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#5a000c"
          gutterBottom
          sx={{ textAlign: 'center', mb: 5 }}
        >
          הקולקציה שלנו
        </Typography>

        {/* כאן תוכל להוסיף רכיבים כמו רשימת מוצרים, סליידרים או כל תוכן שתרצה */}
        <Typography variant="body1" color="#414141" sx={{ mb: 10, textAlign: 'center' }}>
          בקרוב כאן יוצגו המוצרים המעולים שלנו. הישאר מעודכן!
        </Typography>
      </Box>
    </>
  );
};

export default Home;
