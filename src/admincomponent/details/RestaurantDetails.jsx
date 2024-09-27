import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/Action';

const RestaurantDetails = () => {

  const dispatch = useDispatch()
  const restaurant = useSelector(store => store.restaurant)
  console.log('restaurant details',restaurant.userRestaurant);


  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus(restaurant.userRestaurant.id))
  }


  return (
    <div className='lg:px-20 p-5'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
          {restaurant.userRestaurant?.name}
        </h1>
        <div>
          <Button
            onClick={handleRestaurantStatus}
            variant='contained'
            className='py-[1rem] px-[2rem]'
            color={!restaurant.userRestaurant.open ? 'primary' : 'error'}
            size='large'
          >
            {restaurant.userRestaurant.open ? 'Close' : 'Open'}
          </Button>
        </div>
      </div>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className='text-gray-300'>Restaurant</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.owner.fullName}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.name}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Cuisine Type</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant?.cuisineType || 'Food'}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.openingHours}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    <span className={`px-5 py-2 rounded-full ${restaurant.userRestaurant.open ? 'bg-green-400' : 'bg-red-400'}  text-gray-950`}>
                      {restaurant.userRestaurant.open  ? 'Open' : 'Close'}
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ minHeight: 260 }}>
            <CardHeader
              title={<span className='text-gray-300'>Address</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Country</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.address.country }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.address.city }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.address.postalCode }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Street Address</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.address.streetAddress }
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ minHeight: 260 }}>
            <CardHeader
              title={<span className='text-gray-300'>Contact</span>}
            />
            <CardContent>
              <div className='space-y-4 text-gray-200'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.contactInformation.email }
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Mobile</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    {restaurant.userRestaurant.contactInformation.mobile }

                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social</p>
                  <p className='text-gray-400'>
                    <span className='pr-5'>-</span>
                    <p className='inline-flex gap-3'>

                      <a href={restaurant.userRestaurant.contactInformation.instagram }><InstagramIcon sx={{ fontSize: '3rem' }} /></a>
                      <a href="/"><FacebookIcon sx={{ fontSize: '3rem' }} /></a>

                      <a href={restaurant.userRestaurant.contactInformation.twitter }><TwitterIcon sx={{ fontSize: '3rem' }} /></a>
                    </p>

                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDetails
