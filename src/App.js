import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import Navbar from './component/Navbar/Navbar';
import { darkTheme } from './Theme/DarkTheme';
import Home from './component/Home/Home';
import RestaurantDetails from './component/Restaurant/RestaurantDetails';
import Cart from './component/Cart/Cart';
import Profile from './component/Profile/Profile';
import CustomerRoute from './Routes/CustomerRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './component/State/Authentication/Action';
import Routers from './Routes/Routers';
import { getRestaurantByUserIdAction } from './component/State/Restaurant/Action';

function App() {
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")
  const auth = useSelector(store => store.auth)
  useEffect(() => {
    jwt && dispatch(getUser())
  }, [auth.jwt,jwt])

  useEffect(() => {
    auth.jwt && dispatch(getRestaurantByUserIdAction())
  }, [auth.jwt,jwt])


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <RestaurantDetails/> */}
      {/* <Cart/> */}
      {/* <Profile/> */}
      {/* <CustomerRoute /> */}
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
