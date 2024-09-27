import { Box, Button, Card, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemByRestaurantId, updateMenuItemAvailability } from '../../component/State/Menu/Action';





const orders = [1, 1, 1, 1,]
const MenuTable = () => {


    const restaurant = useSelector(store => store.restaurant)

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const menu = useSelector(store => store.menu)
    useEffect(() => {
        dispatch(getMenuItemByRestaurantId({
            restaurantId: restaurant.userRestaurant.id,
        }))
    }, [menu.menuItems.length])
    const handleupDateStoke = (id)=>{
        dispatch(updateMenuItemAvailability(id))
    }
    const handleDelete = (id)=>{
        dispatch(deleteFoodAction(id))
    }
    return (
        <Box className=''>
            <Card>
                <CardHeader
                    title="Menu"
                    action={
                        <IconButton aria-label="settings" onClick={() => navigate(`${location.pathname}/create`)}>
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Image</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Ingredients</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Availability</TableCell>
                                <TableCell align="left">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {menu.menuItems.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">
                                        <img
                                            className='w-[3rem] h-[3rem] object-cover rounded-full'
                                            src={item.images[0]} alt='' />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="left">
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {item.ingredients.map((value) => (
                                                <Chip key={value.id} label={value.name} />
                                            ))}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">{item.price}</TableCell>
                                    <TableCell align="left">
                                        <Button onClick={()=>handleupDateStoke(item.id)}>
                                            {item.available ? 'In_Stoke' : 'Out_of_Stoke'}
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={()=>handleDelete(item.id)}>
                                            <DeleteIcon sx={{ color: 'red' }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    )
}

export default MenuTable
