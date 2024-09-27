import React, { useEffect } from 'react'
import "./Home.css"
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRestaurantsAction } from '../State/Restaurant/Action'
import { findCart } from '../State/Cart/Action'
import { Box, CircularProgress } from '@mui/material'
import { getUserFavourites } from '../State/Authentication/Action'



const Home = () => {
    const auth = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const restaurant = useSelector(store => store.restaurant)
    useEffect(() => {
        dispatch(getAllRestaurantsAction())
        auth.jwt && dispatch(findCart())
        dispatch(getUserFavourites())
    }, [auth.jwt])
    return (
        <div className='pb-10'>

            <section className='banner -z-50 relative flex flex-col justify-center items-center'>

                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>NHT Food</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>The best Restaurant in Asia : Delicious, Heathy and Cheap</p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>

                <div className='fadout'>

                </div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meels</p>
                <MultiItemCarousel />
            </section>
            <section className='px-5 lg:px-20 pt-10'>
                <h1 className='text-2xl font-semibold text-gray-400 pb-8'
                >
                    Order From Our Handpicked Favourites
                </h1>
                <div className='flex flex-wrap items-center justify-around gap-2'>
                    {restaurant.restaurants.map(item => <RestaurantCard key={item.id} item={item} />)}
                </div>
            </section>

        </div>
    )
}

export default Home
