import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../../utils/CategorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';


const MenuCard = ({ item }) => {
    const dispatch= useDispatch()
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const handleCheckboxChange = (value) => {
        console.log(value)
        if (selectedIngredients.includes(value)) {
            setSelectedIngredients(selectedIngredients.filter(item => item!== value))
        }else{
            setSelectedIngredients([...selectedIngredients,value])
        }
    }

    const handleAddItemToCart = () => {
        const reqData = {
            foodId: item.id,
            quantity: 1,
            ingredients: selectedIngredients
        }
        console.log("reqData", reqData);
        dispatch(addItemToCart(reqData))
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1-content'
                    id="panel1-header"
                >
                    <div className='lg:flex items-center justify-between'>
                        <div className='flex items-center lg:gap-5'>
                            <img
                                className='w-[7rem] h-[7rem] object-cover'
                                src={item.images[0]}
                                alt=''
                            />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                <p className='font-semibold text-xl'>{item.name}</p>
                                <p>{item.price}$</p>
                                <p className='text-gray-400'>{item.description}</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <p className='pb-5'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <form>
                        <div className='flex gap-5 flex-wrap'>
                            {
                                Object.keys(categorizeIngredients(item.ingredients)).map(category =>
                                    <div key={category}>
                                        <p>{category}</p>
                                        <FormGroup>
                                            {
                                                categorizeIngredients(item.ingredients)[category].map(ingredientItem =>
                                                    <FormControlLabel key={ingredientItem.name} control={<Checkbox disabled={!ingredientItem.inStoke} onChange={() => handleCheckboxChange(ingredientItem.name)} />} label={ingredientItem.name} />
                                                )
                                            }
                                        </FormGroup>
                                    </div>
                                )
                            }
                        </div>
                        <div className='pt-5'>
                            <Button onClick={handleAddItemToCart} disabled={!item.available} variant='contained'>{item.available ? 'Add to Cart' : 'Out of Stock'}</Button>
                        </div>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MenuCard
