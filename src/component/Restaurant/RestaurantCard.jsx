import { Card, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavourites, getUserFavourites } from '../State/Authentication/Action';
import { isPresentInFavourites } from '../config/logic';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({item}) => {
    const navigate = useNavigate()
    const auth = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const handleAddToFavorite = ()=>{
        dispatch(addToFavourites(item.id))
    }
    const handleNavigateToRestaurant = ()=>{
        if(item.open){
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
        }
    }
    // useEffect(()=>{
    //     dispatch(getUserFavourites())
    // })
    return (
        <Card className='m-5 w-[18rem]'>
            <div className={`${item.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img
                    className='w-full h-[10rem] rounded-t-md object-cover'
                    alt=''
                    src={item?.images[0]}
                />
                <Chip
                    size='small'
                    className='absolute top-2 left-2'
                    color={item.open ? "success" : "error"}
                    label={item.open ? "Open" : "Closed"}
                />
            </div>
            <div className='p-4 textPart lg:flex w-full justify-between restaurant__details'>
                <div className='space-y-1'>
                    <p onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>
                        {item.name || item.title}
                    </p>
                    <p className='text-gray-500 text-sm'>
                        {item.description}
                    </p>
                </div>
                <div className='favourite'>
                    <IconButton onClick={handleAddToFavorite}>
                        {isPresentInFavourites(auth.favourites,item)?<FavoriteIcon color='primary'/>:<FavoriteBorderIcon/>}
                    </IconButton>
                </div>
            </div>
        </Card>
    )
}

export default RestaurantCard
