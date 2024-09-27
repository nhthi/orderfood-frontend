import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';



const menu = [
    {title:'Dashboard', icon: <Dashboard/> , path:'/'},
    {title:'Orders', icon: <ShoppingBag/> , path:'/orders'},
    {title:'Menu', icon: <ShopTwoIcon/> , path:'/menu'},
    {title:'Food Category', icon: <CategoryIcon/> , path:'/category'},
    {title:'Ingredients', icon: <FastfoodIcon/> , path:'/ingredients'},
    {title:'Events', icon: <EventIcon/> , path:'/event'},
    {title:'Details', icon: <AdminPanelSettingsIcon/> , path:'/details'},
    {title:'Logout', icon: <LogoutIcon/> , path:'/'},
]



const AdminSideBar = ({open, handleClose}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavigate = (item)=>{
        if(item.title==="Logout"){
            dispatch(logout())
            navigate("/")
        }else{
            navigate(`/admin/restaurant${item.path}`)
        }
    }

    const isSmallScreen = useMediaQuery("(max-width:1080px)")
  return (
    <div className=''>
            <Drawer
                onClose={handleClose}
                open={isSmallScreen ? open : true}
                sx={{ zIndex: 1 }}
                anchor='left'
                variant={isSmallScreen ? "temporary" : "permanent"}
            >
                <div className='w-[70vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl space-y-[1.65rem] mt-20'>
                    {menu.map((item,index) =>
                        <>  
                            <div key={index} onClick={()=>handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
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

export default AdminSideBar
