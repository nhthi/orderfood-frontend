import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';




const menu = [
    {
        title: "Orders",
        icon: <ShoppingBagIcon />,
        path: 'orders'
    },
    {
        title: "Address",
        icon: <HomeIcon />,
        path: 'address'
    },
    {
        title: "Favorites",
        icon: <FavoriteIcon />,
        path: 'favorites'
    },
    {
        title: "Payment",
        icon: <AccountBalanceWalletIcon />,
        path: 'payment'
    },
    {
        title: "Notification",
        icon: <NotificationsIcon />,
        path: 'notifications'
    },
    {
        title: "Events",
        icon: <EventIcon />,
        path: 'events'
    },
    {
        title: "Log out",
        icon: <LogoutIcon />,
        path: 'logout'
    },
]

const ProfileNavigation = ({ open, handleClose }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigate = (item)=>{
        if(item.path==="logout"){
            dispatch(logout())
            navigate("/")
        }else{
            navigate(`/my-profile/${item.path}`)
        }
    }

    const isSmallScreen = useMediaQuery("(max-width:800px)")
    return (
        <div className=''>
            <Drawer
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                sx={{ zIndex: 1 }}
                anchor='left'
                variant={isSmallScreen ? "temporary" : "permanent"}
            >
                <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16'>
                    {menu.map((item,index) =>
                        <>  
                            <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                                {item.icon}
                                <span>
                                    {item.title}
                                </span>
                            </div>
                            {index !== menu.length-1 && <Divider/> }
                        </>
                    )}
                </div>
            </Drawer>
        </div>
    )
}

export default ProfileNavigation
