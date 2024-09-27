import { Box, Button, Divider, FormControl, FormControlLabel, Grid, Menu, Modal, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantByIdAction, getRestaurantCategory } from '../State/Restaurant/Action';
import { getMenuItemByRestaurantId } from '../State/Menu/Action';
import { REMOVE_ERROR } from '../State/Cart/ActionType';


const foodTypes = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Vegetarian only',
        value: 'vegetarian'
    },
    {
        label: 'Non-Vegetarian',
        value: 'non_vegetarian'
    },
    {
        label: 'Seasonal',
        value: 'seasonal'
    }

]


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    bgcolor: 'gray',

    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const RestaurantDetails = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);





    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector(store => store.auth)
    const cart = useSelector(store => store.cart)
    const restaurant = useSelector(store => store.restaurant)
    const menu = useSelector(store => store.menu)
    const [selectedCategory, setSelectedCategory] = useState('')
    const { id, city, title } = useParams()
    const [foodType, setFoodType] = useState("all")



    const handleClose = () => {
        dispatch({ type: REMOVE_ERROR })
    }

    const handleFilter = (e) => {
        console.log(e.target.value, e.target.name);
        setFoodType(e.target.value)
    }

    const handleFilterFoodCategory = (e) => {
        console.log(e.target.value, e.target.name);
        setSelectedCategory(e.target.value)
    }

    useEffect(() => {
        dispatch(getRestaurantByIdAction(id))
        dispatch(getRestaurantCategory(id))

    }, [])

    useEffect(() => {
        dispatch(getMenuItemByRestaurantId({
            restaurantId: id,
            vegetarian: foodType === 'vegetarian',
            nonveg: foodType === 'nonveg',
            seasonal: foodType === 'seasonal',
            foodCategory: selectedCategory
        }))
    }, [selectedCategory, foodType])

    return (

        <div className='px-5 lg:px-20'>
            <Modal
                open={cart.error?.response?.status === 403 || false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                        Bạn cần phải đăng nhập để thực hiện chức năng này
                    </Typography>
                    <Button fullWidth onClick={() => {
                        dispatch({ type: REMOVE_ERROR })
                        navigate('/account/login')
                    }} variant='contained'>Go to Login</Button>
                </Box>
            </Modal>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/india/indian fast food/{id}</h3>
                <div>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <img
                                className='w-full h-[40vh] object-cover'
                                src={restaurant.restaurant?.images[0]}
                                alt=''
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img
                                className='w-full h-[40vh] object-cover'
                                // src='https://cdn.pixabay.com/photo/2015/06/30/18/36/st-826688_1280.jpg'
                                src={restaurant.restaurant?.images[1]}

                                alt=''
                            />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img
                                className='w-full h-[40vh] object-cover'
                                // src='https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg'
                                src={restaurant.restaurant?.images[2] || 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg'}

                                alt=''
                            />
                        </Grid>
                    </Grid>
                </div>

                <div className='pt-3 pb-5 space-y-5'>
                    <h1 className='text-4xl font-semibold'>
                        {restaurant.restaurant?.name}
                    </h1>
                    <p className='text-gray-500' >
                        {restaurant.restaurant?.description}
                    </p>
                    <p className='text-gray-500 flex items-center gap-3' >
                        <LocationOnIcon />
                        <span>
                            {`${restaurant.restaurant?.address?.city}, ${restaurant.restaurant?.address?.country}`}
                        </span>

                    </p>
                    <p className='text-gray-500 flex items-center gap-3' >
                        <CalendarTodayIcon />
                        <span>
                            Mon-Sun: 9:00 AM - 9:00 PM (Today)
                        </span>

                    </p>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relative'>

                <div className='lg:w-[20%] filter '>

                    <div className='box space-y-5 lg:sticky top-28 p-5 shadow-md'>
                        <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>
                            Food Type
                        </Typography>
                        <FormControl className='py-10 space-y-5' component={"fieldset"}>
                            <RadioGroup name='food_type' onChange={handleFilter} value={foodType}>
                                {foodTypes.map(item =>
                                    <FormControlLabel
                                        key={item.value}
                                        value={item.value}
                                        label={item.label}
                                        control={<Radio />}
                                    />
                                )}

                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Divider />

                    <div className='box space-y-5 lg:sticky top-[100%] h-[40vh] p-5'>
                        <Typography variant='h5' sx={{ paddingBottom: '1rem' }}>
                            Food Category
                        </Typography>
                        <FormControl className='py-10 space-y-5 h-[36vh] overflow-y-scroll hide-scrollbar' component={"fieldset"}>
                            <RadioGroup name='food_catgory' onChange={handleFilterFoodCategory} value={selectedCategory}>
                                {restaurant.categories.map(item =>
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.name}
                                        label={item.name.toUpperCase()}
                                        control={<Radio />}
                                    />
                                )
                                }
                            </RadioGroup>
                        </FormControl>
                    </div>

                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {menu.menuItems.map(item => <MenuCard item={item} />)}
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetails
