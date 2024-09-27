import React, { useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Order from '../order/Order'
import Menu from '../menu/Menu'
import FoodCategory from '../foodcategory/FoodCategory'
import Ingredients from '../ingredients/Ingredients'
import Events from '../events/Events'
import RestaurantDetails from '../details/RestaurantDetails'

const Admin = () => {

    const [openSideBar,setOpenSideBar] = useState(false)


  return (
    <div >
      <div className='lg:flex justify-between'>
            <div className='sticky h-[80vh] lg:w-[20%]'>
                <AdminSideBar open={openSideBar}/>
            </div>
            <div className='lg:w-[80%]'>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/orders' element={<Order/>}/>
                <Route path='/menu/*' element={<Menu/>}/>
                <Route path='/category' element={<FoodCategory/>}/>
                <Route path='/ingredients' element={<Ingredients/>}/>
                <Route path='/event' element={<Events/>}/>
                <Route path='/details' element={<RestaurantDetails/>}/>
              </Routes>
            </div>
      </div>
    </div>
  )
}

export default Admin
