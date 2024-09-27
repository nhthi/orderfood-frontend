import { Box, Button, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { style } from '../../component/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientsCategory, getIngredientCategory } from '../../component/State/Ingredients/Action';





const IngredientCategoryTable = () => {
    const dispatch = useDispatch()
    const restaurant = useSelector(store => store.restaurant)
    const ingredients = useSelector(store => store.ingredients)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpenIngredientCategoryModal = () => setOpen(true)

    const [ingredientCategory, setIngredientCategory] = useState('')

    const handleInputChange = (e) => {
        setIngredientCategory(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (ingredientCategory.length > 0) {
            console.log("ingredientCategory", ingredientCategory);
            dispatch(createIngredientsCategory({
                name: ingredientCategory,
                restaurantId: restaurant.userRestaurant.id
            }))
            setIngredientCategory('')
            handleClose()
        }
    }
    useEffect(() => {
        dispatch(getIngredientCategory(restaurant.userRestaurant.id))
    }, [])
    return (
        <Box className=''>
            <Card>
                <CardHeader
                    title="Categories"
                    action={
                        <IconButton aria-label="settings" onClick={handleOpenIngredientCategoryModal}>
                            <CreateIcon />
                        </IconButton>
                    }
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">id</TableCell>
                                <TableCell align="left">Name</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.category.map((item) => (
                                <TableRow
                                    key={item.name}
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
                    <h1 className='text-center pb-5 text-xl'>Create New Ingredient Category</h1>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            id="ingredientCategory"
                            name='ingredientCategory'
                            label="Ingredient Category"
                            variant='outlined'
                            onChange={handleInputChange}
                            value={ingredientCategory}
                        >

                        </TextField>
                        <Button fullWidth variant='contained' type='submit'>Create Ingredient Category</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    )
}

export default IngredientCategoryTable
