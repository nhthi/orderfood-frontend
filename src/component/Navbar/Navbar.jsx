import { Avatar, Badge, Icon, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { pink } from '@mui/material/colors';
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const navigate = useNavigate()
  const auth = useSelector(store => store.auth)
  console.log(auth.user);
  const cart = useSelector(store => store.cart)


  const handleAvatarClick = ()=>{
    if(auth.user.role === "ROLE_CUSTOMER"){
      navigate("/my-profile")
    }else{
      navigate("/admin/restaurant")
    }
  }

  return (
    <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center sticky top-0 left-0 right-0'>

      <div className='lg:mr-10 cursor-pointer space-x-4'>
        <li onClick={()=>navigate('/')} className='list-none logo font-semibold text-gray-300 text-2xl'>
          NHT Food
        </li>
      </div>

      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
            <SearchIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </div>
        <div className=''>
          {
            auth.user ?
              <IconButton onClick={handleAvatarClick}>
                <Avatar src={auth.user?.avatar || ''} sx={{ backgroundColor: 'white', color: pink.A400 }}>
                  {auth.user.fullName[0].toUpperCase()}
                </Avatar>
              </IconButton> :
              <IconButton onClick={()=>navigate("/account/login")}>
                <Person />
              </IconButton>
          }
        </div>
        <div className=''>
          <IconButton onClick={()=>navigate('/cart')}>
            <Badge color='secondary' badgeContent={cart?.cartItems.length}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Navbar
