import { AddPhotoAlternate, Close } from '@mui/icons-material'
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { upload } from '@testing-library/user-event/dist/upload'
import { ErrorMessage, Field, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import { uploadToCloundinary } from '../../utils/UploadToCloudinary'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientCategory, getIngredientOfRestaurant } from '../../component/State/Ingredients/Action'
import { getRestaurantCategory } from '../../component/State/Restaurant/Action'
import { createMenuItem } from '../../component/State/Menu/Action'
import { useNavigate } from 'react-router-dom'



const initialValues = {
  name: '',
  description: '',
  price: '',
  category: '',
  resaurantId: '',
  vegetarin: true,
  seasonal: false,
  ingredients: [],
  images: []
}
const validationSchema = Yup.object({
  name: Yup.string().required("Name is requires"),
})




const CreateMenuForm = () => {

  const navigate = useNavigate()
  const ingredients  = useSelector(store=>store.ingredients)
  const restaurant  = useSelector(store=>store.restaurant)

  const dispatch = useDispatch()
  const [uploadImage, setUploadImage] = useState(false)
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = restaurant.userRestaurant.id
      console.log("values", values);
      dispatch(createMenuItem(values))
      navigate("/admin/restaurant/menu")
    },
  })

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    setUploadImage(true)
    const image = await uploadToCloundinary(file, 'image')
    formik.setFieldValue("images", [...formik.values.images, image])
    setUploadImage(false)
  }

  const handleRemoveImage = (index) => {
    const uploadImages = [...formik.values.images]
    uploadImages.splice(index, 1)
    formik.setFieldValue("images", uploadImages)
  }

  useEffect(()=>{
    dispatch(getRestaurantCategory(restaurant.userRestaurant.id))
    dispatch(getIngredientOfRestaurant(restaurant.userRestaurant.id))
  },[])
  return (
    <div className='py-10 lg:flex items-center justify-center min-h-screen'>
      <div className='lg:max-w-4xl'>
        <h1 className='font-bold text-2xl text-center py-2'>
          Add New Menu Item
        </h1>
        <form className='space-y-4' onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item className='flex flex-wrap gap-5' xs={12}>
              <input
                accept='image/*'
                id='fileInput'
                style={{ display: 'none' }}
                onChange={handleImageChange}
                type='file'
              />
              <label className='relative' htmlFor='fileInput'>
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center
                    p-3 border rounded-md border-gray-600'>
                  <AddPhotoAlternate className='text-white' />
                </span>
                {
                  uploadImage &&
                  <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                }
              </label>
              <div className='flex flex-wrap gap-2'>
                {
                  formik.values.images.map((image, index) =>
                    <div key={index} className='relative'>
                      <img
                        className='w-24 h-24 object-cover'
                        alt=''
                        src={image}
                      />
                      <IconButton
                        onClick={() => handleRemoveImage(index)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          outline: 'none'
                        }}>
                        <Close sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </div>)
                }
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.name}
              >
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.description}
              >
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                variant='outlined'
                onChange={formik.handleChange}
                value={formik.values.price}
              >
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Food Category</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={formik.values.category}
                  name="category"
                  onChange={formik.handleChange}
                  label="Food Category"
                >
                  {
                    restaurant.categories.map(item =>
                      <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                    )
                  }

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                <Select
                  fullWidth
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  name='ingredients'
                  value={formik.values.ingredients}
                  onChange={formik.handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                >
                  {ingredients.ingredients.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Is Vegetarian</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={formik.values.vegetarin}
                  name="vegetarin"
                  onChange={formik.handleChange}
                  label="Is Vegetarian"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">Is Seasonal</InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={formik.values.seasonal}
                  name="seasonal"
                  onChange={formik.handleChange}
                  label="Is Seasonal"
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type='submit' variant='contained' color='primary' >Create Menu Item</Button>
        </form>
      </div>
    </div >
  )
}

export default CreateMenuForm
