import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { style } from '../Cart/Cart';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ForgorPassword from './ForgotPassword';
import { useDispatch } from 'react-redux';

const Auth = () => {

    const  location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleClose = ()=>{
        navigate("/")
        dispatch({type:'SET_ERROR_NULL'})
    }
  return (
    <>
      <Modal 
      open={
        location.pathname ==="/account/register"
        || location.pathname === "/account/login"
        || location.pathname === "/account/forgotpassword"
      }
      onClose={handleClose}
      >
        
        <Box sx={style}>
            {
                        location.pathname ==="/account/register" ? <RegisterForm/>  : location.pathname ==="/account/forgotpassword" ? <ForgorPassword/> : <LoginForm/>
            }
        </Box>

      </Modal>
    </>
  )
}

export default Auth
