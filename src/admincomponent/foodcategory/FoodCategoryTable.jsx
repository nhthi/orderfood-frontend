import { Box, Button, Card, CardHeader, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from "yup"
import { Form } from 'react-router-dom';
import { style } from '../../component/Cart/Cart';
import { create } from '@mui/material/styles/createTransitions';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, getRestaurantCategory } from '../../component/State/Restaurant/Action';



const orders = [1, 1, 1, 1,]
const FoodCategoryTable = () => {

    const dispatch = useDispatch()
    const restaurant = useSelector(store=>store.restaurant)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpenCategoryModal = () => setOpen(true)

    const [categoryName,setCategoryName] = useState('')

    const handleInputChange=(e)=>{
        setCategoryName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(categoryName.length > 0){
            console.log("Categoryname",categoryName);
            dispatch(createCategoryAction({name:categoryName}))
            setCategoryName('')
            handleClose()
        }
    }
    useEffect(()=>{
        dispatch(getRestaurantCategory(restaurant.userRestaurant.id))
    },[])
    return (
        <Box className=''>
            <Card>
                <CardHeader
                    title="Food Category"
                    action={
                        <IconButton aria-label="settings" onClick={handleOpenCategoryModal}>
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">id</TableCell>
                                <TableCell align="left">Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurant.categories.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <h1 className='text-center pb-5 text-xl'>Create New Food Category</h1>
                        <form className='space-y-5' onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                id="categoryname"
                                name='categoryName'
                                label="Category"
                                variant='outlined'
                            onChange={handleInputChange}
                            value={categoryName}
                            >

                            </TextField>
                            <Button fullWidth variant='contained' type='submit'>Create Category</Button>
                        </form>
                </Box>
            </Modal>
        </Box>
    )
}

export default FoodCategoryTable
