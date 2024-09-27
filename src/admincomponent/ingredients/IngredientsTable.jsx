import { Box, Button, Card, CardHeader, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { style } from '../../component/Cart/Cart';
import { createIngredients, getIngredientCategory, getIngredientOfRestaurant, updateStokeIngredients } from '../../component/State/Ingredients/Action';
import { useDispatch, useSelector } from 'react-redux';




const initialValues = {
    name: '',
    categoryId: '',
    restaurantId: ''
}
const orders = [1, 1, 1, 1,]
const Ingredientstable = () => {
    const dispatch = useDispatch()
    const restaurant = useSelector(store => store.restaurant)
    const ingredients = useSelector(store => store.ingredients)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpenIngredientsModal = () => setOpen(true)
    const [formValue, setFormValue] = useState(initialValues)

    const handleInputChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formValue.name.length > 0 && formValue.categoryId) {
            dispatch(createIngredients({
                ...formValue,
                restaurantId: restaurant.userRestaurant.id
            }))
            setFormValue(initialValues)
            handleClose()
        }
    }

    useEffect(() => {
        dispatch(getIngredientCategory(restaurant.userRestaurant.id))
        dispatch(getIngredientOfRestaurant(restaurant.userRestaurant.id))
    }, [])

    const handleUpdateStoke = (id) => {
        dispatch(updateStokeIngredients(id))
    }
    return (
        <Box className=''>
            <Card>
                <CardHeader
                    title="Ingredients"
                    action={
                        <IconButton aria-label="settings" onClick={handleOpenIngredientsModal}>
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
                                <TableCell align="left">Category</TableCell>
                                <TableCell align="left">Availability</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.ingredients.map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{item.id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.category.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={()=>handleUpdateStoke(item.id)}>
                                            {item.inStoke ? 'In_Stock' : 'Out_of_Stock'}
                                        </Button>
                                    </TableCell>

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
                    <h1 className='text-center pb-5 text-xl'>Create New Ingredient</h1>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="ingredients"
                            name='name'
                            label="Ingredients"
                            variant='outlined'
                            onChange={handleInputChange}
                            value={formValue.name}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-autowidth-label">Food Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={formValue.categoryId}
                                name="categoryId"
                                onChange={handleInputChange}
                                label="Food Category"
                            >
                                {
                                    ingredients.category.map(item =>

                                        <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                                    )
                                }

                            </Select>
                        </FormControl>
                        <Button fullWidth variant='contained' type='submit'>Create Ingredient</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}

export default Ingredientstable
