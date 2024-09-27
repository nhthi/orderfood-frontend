import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEvent } from '../State/Restaurant/Action';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';



const EventCard = ({ item }) => {
    const restaurant = useSelector(store => store.restaurant)
    const dispatch = useDispatch()
    const handleDeleteEvent = () => {
        dispatch(deleteEvent(item.id))
    }

    const navigate = useNavigate()
    const handleNavigateToRestaurant = ()=>{
        if(item.restaurant.open){
            navigate(`/restaurant/${item.restaurant.address.city}/${item.restaurant.name}/${item.restaurant.id}`)
        }
    }
    return (
        <div>
            <Card sx={{ width: 345 }}>
                <CardMedia
                    image={item.image}
                    sx={{ height: 345 }}
                />
                <CardContent>
                    <Typography variant='h5' className='cursor-pointer' onClick={handleNavigateToRestaurant}>
                        {item.restaurant.name}
                    </Typography>
                    <Typography variant='body' color={'greenyellow'} >
                        {item.eventName}
                    </Typography>
                    <div className='py-2 '>
                        <p>
                            <LocationOnIcon sx={{marginLeft:-1}}/>
                            {item.location}
                        </p>
                        <div className='flex justify-between items-center'>
                            <div className=' space-y-1 mt-2'>
                                <p className='text-sm text-blue-500'>{item.startAt}</p>
                                <p className='text-sm text-red-500'>{item.endAt}</p>
                            </div>
                            {item.restaurant?.id === restaurant.userRestaurant?.id && <CardActions>
                                <IconButton onClick={handleDeleteEvent}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>}
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default EventCard
