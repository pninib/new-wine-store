import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './components/user/sigin.js';
import Login from './components/user/login.js';
import UpdateWineForm from './components/wine/updateWine.js';
import AddWineForm from './components/wine/addWine.js';
import DeleteWine from './components/wine/deleteWine.js';
import CardList from './components/wine/cardList.js';
import Home from './home.js';
import AllUsers from './components/user/allUser.js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './components/user/userSlice.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import WineDetails from './components/wine/WineDetails.js';
import CartPopup from './components/order/cartPopup.js';
import CartPage from './components/order/cartPage.js';
import CheckoutPage from './components/order/byy.js';



const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#5a2a27', // בורדו כהה
      contrastText: '#fff',
    },
    secondary: {
      main: '#c49a6c', // זהב קלאסי
      contrastText: '#fff',
    },
    background: {
      default: '#fff8f0',
    },
  },
  typography: {
    fontFamily: '"Assistant", "Alef", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
        },
      },
    },
  },
});



const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <CartPopup />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addWine" element={<AddWineForm />} />
            <Route path="/sigin" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/updateWine" element={<UpdateWineForm />} />
            <Route path="/deleteWine/:id" element={<DeleteWine />} />
            <Route path='/wines' element={<CardList />} />
            <Route path="/allUsers" element={<AllUsers />} />
            <Route path="/wine/:id" element={<WineDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
