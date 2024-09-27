import { Box, Button, Card, Divider, Grid, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCart from './AddressCart'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux';
import { findCart, removeCartItem } from '../State/Cart/Action';
import { createOrder } from '../State/Order/Action';
import { createAddress, getUser } from '../State/Authentication/Action';
import { GET_USER_ADDRESS_SUCCESS } from '../State/Authentication/ActionType';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
};

const Cart = () => {

    const cart = useSelector(store => store.cart)
    const auth = useSelector(store => store.auth)
    const [isSelected, setIsSelected] = useState(false)
    const [addressSelected, setAddressSelected] = useState()
    const dispatch = useDispatch()
    const initialValues = {
        streetAddress: "Tân Khánh Đông",
        stateProvince: "Đồng Tháp",
        postalCode: "1223",
        city: "Sa Đéc"
    }

    const validationSchema = Yup.object({
        streetAddress: Yup.string().required("Street address is requires"),
        stateProvince: Yup.string().required("State is requires"),
        postalCode: Yup.string().required("Pincode is requires"),
        city: Yup.string().required("City is requires")
    })


    const handleSubmitOrder = () => {
        const reqData = {
            restaurantId: cart.cartItems[0]?.food.restaurant.id,
            deliveryAddress: addressSelected,
            cartItems: cart.cartItems
        }
        if (cart.cartItems.length === 0) {
            setIsSelected('The cart is empty !!!')
        } else {
            if (reqData.deliveryAddress) {
                dispatch(createOrder(reqData))
                for (let cartItem of cart.cartItems) {
                    dispatch(removeCartItem(cartItem.id))
                }
                handleClose()
            } else {
                setIsSelected('Please choose delivery address !!!')
            }
        }


    }

    const handleSubmitAddress = (values) => {
        dispatch(createAddress(values))
        handleClose()
    }


    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpenAddressModal = () => setOpen(true)

    const handleSelectAddress = (item) => {
        setAddressSelected(item)
        setIsSelected('')
    }
    useEffect(() => {
        dispatch({ type: GET_USER_ADDRESS_SUCCESS })
    }, [auth.addresses.length])

    useEffect(() => {
        dispatch(findCart())
    }, [cart.cart?.total])
    return (
        <div>
            {
                cart.cartItems.length > 0
                    ?
                    <main className='lg:flex justify-between'>
                        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10 '>
                            {cart.cartItems.map(item => <CartItem item={item} />)}
                            <Divider />
                            <div className='billDetails px-5 text-sm space-y-2'>
                                <p className='font-extralight py-5 flex flex-col'>
                                    Delivery address{
                                        <span className='font-semibold text-xs text-red-500'>{isSelected}</span>
                                    }
                                </p>
                                <div className="flex justify-between text-gray-400">
                                    {addressSelected && <p>{`${addressSelected?.streetAddress}, ${addressSelected?.stateProvince}, ${addressSelected?.city}, Viet Nam`}</p>}
                                </div>
                                <p className='font-extralight py-5'>Bill Details</p>
                                <div className="flex justify-between text-gray-400">
                                    <p>Item Total</p>
                                    <p>${cart.cart?.total}</p>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <p>Delivery Free</p>
                                    <p>$21</p>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <p>PlateFrom Free</p>
                                    <p>$19</p>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <p>GST & Restaurant Charges</p>
                                    <p>$19</p>
                                </div>
                                <Divider />
                                <div className='flex justify-between text-gray-400 pb-2'>
                                    <p>Total Pay</p>
                                    <p>${cart.cart?.total + 21 + 19 + 19}</p>
                                </div>
                                <Button variant='contained' fullWidth onClick={handleSubmitOrder}>Order Now</Button>
                            </div>
                        </section>
                        <Divider orientation='vertical' />
                        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
                            <div>
                                <h1 className='text-center font-semibold text-2xl py-10'>
                                    Choose Delivery Address
                                </h1>
                                <div className='flex justify-center flex-wrap gap-5'>
                                    {auth.addresses.map(item => <AddressCart handleSelectAddress={handleSelectAddress} item={item} select={addressSelected?.id === item.id} />)}
                                    <Card className='flex gap-5 w-64 p-5 justify-center items-center'>
                                        <AddLocationAltIcon />
                                        <div className='space-y-3'>
                                            <h1 className='font-semibold text-lg text-white'>Add new address</h1>
                                            <Button variant='contained' fullWidth onClick={handleOpenAddressModal}>Add</Button>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </section>
                    </main>
                    :
                    <main className='flex justify-center items-center h-[80vh]'>
                        <div className='flex flex-col justify-center items-center'>
                            <RemoveShoppingCartIcon sx={{fontSize:'10rem'}}/>
                            <p className='text-3xl p-2 font-semibold'>Your Cart Is Empty</p>
                        </div>
                    </main>  
            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitAddress}
                    >

                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="streetAddress"
                                        label="Street Address"
                                        variant="outlined"
                                        fullWidth
                                        helperText={
                                            <ErrorMessage name="streetAddress">
                                                {(msg) => <span className='text-red-600'>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                    />
                                </Grid>
                                <Grid item container xs={12} spacing={1}>
                                    <Grid item xs={12} md={6} >
                                        <Field
                                            as={TextField}
                                            name="stateProvince"
                                            label="State"
                                            variant="outlined"
                                            fullWidth
                                            helperText={
                                                <ErrorMessage name="stateProvince">
                                                    {(msg) => <span className='text-red-600'>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <Field
                                            as={TextField}
                                            name="postalCode"
                                            label="Pincode"
                                            variant="outlined"
                                            fullWidth
                                            helperText={
                                                <ErrorMessage name="postalCode">
                                                    {(msg) => <span className='text-red-600'>{msg}</span>}
                                                </ErrorMessage>
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        name="city"
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        helperText={
                                            <ErrorMessage name="city">
                                                {(msg) => <span className='text-red-600'>{msg}</span>}
                                            </ErrorMessage>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="primary" type="submit">
                                        Add Address
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Formik>
                </Box>
            </Modal>
        </div>

    )
}

export default Cart
