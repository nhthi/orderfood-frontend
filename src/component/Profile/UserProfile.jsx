import React, { useEffect, useState } from 'react'
import { Avatar, Backdrop, Box, Button, Card, CardHeader, CircularProgress, IconButton, Modal, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { style } from '../Cart/Cart';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import { uploadToCloundinary } from '../../utils/UploadToCloudinary';
import {  updateUserProfile } from '../State/Authentication/Action';


const UserProfile = () => {
  const auth = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const [loading, setLoading] = useState(false)


  console.log('user', auth.user);
  const formik = useFormik({
    initialValues: {
      fullName: auth.user?.fullName || '',
      email: auth.user?.email || '',
      avatar: auth.user?.avatar || ''
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateUserProfile(values))
      handleClose()
    }
  })
  const handleSelectAvatar = async (e) => {
    setLoading(true)
    const imgUrl = await uploadToCloundinary(e.target.files[0], 'image')
    formik.setFieldValue('avatar', imgUrl)
    setLoading(false)
  }
  useEffect(() => {
    formik.setValues({
      fullName: auth.user?.fullName || '',
      email: auth.user?.email || '',
      avatar: auth.user?.avatar || ''
    });
  }, [auth.user, open]);
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center '>
      <div className='flex flex-col items-center justify-center'>
        <Avatar src={auth.user?.avatar || ''} sx={{ width: "10rem", height: '10rem' }} />
        <h1 className='py-5 text-2xl font-semibold'>{auth.user?.fullName}</h1>
        <p>Email: {auth.user?.email}</p>
        <Button variant='outlined' onClick={() => setOpen(true)} sx={{ margin: "2rem 0rem" }}>Edit</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex justify-between items-center'>
              <div className='flex space-x-3 items-center'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>
                  EDIT PROFILE
                </p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div className='my-5'>
              <input
                type='file'
                accept='image/*'
                onChange={handleSelectAvatar}
                style={{ display: 'none' }}
                id='image-input'
              />
              <label htmlFor='image-input'>
                <div className="px-5 flex justify-center items-start mt-5">
                  <Avatar
                    sx={{ width: "10rem", height: "10rem" }}
                    src={formik.values.avatar || ''}
                  />
                </div>
              </label>
            </div>
            <div className='space-y-3'>
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                variant="outlined"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
          </form>
          {loading && <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}
        </Box>
      </Modal>
    </div>
  )
}

export default UserProfile
