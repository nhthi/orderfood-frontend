import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../component/Navbar/Navbar'
import Auth from '../component/Auth/Auth'
import CreateRestaurantForm from '../admincomponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../admincomponent/admin/Admin'
import { useSelector } from 'react-redux'

const AdminRoute = () => {

    const restaurant = useSelector(store => store.restaurant)
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/*' element={restaurant.userRestaurant ? <Admin /> : <CreateRestaurantForm />} />
            </Routes>
            <Auth />
        </div>
    )
}

export default AdminRoute
