import React, {useState} from 'react';
import './OrderForm.css'

const possibleIngredients = [
  'beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 
  'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 
  'jalapenos', 'cilantro', 'sour cream'
];

export const OrderForm = () => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingOptions, setIngOptions] = useState(possibleIngredients)

  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
    setName('')
    setIngredients([])
  }

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value)
  }

  const handleIngredientChange = e => {
    e.preventDefault()
    if (!ingredients.includes(e.target.name)) {
      setIngredients([...ingredients, e.target.name])
    }
  }

  const ingredientButtons = ingOptions.map(ingredient => {
    return (
      <button 
        key={ingredient} 
        name={ingredient} 
        onClick={e => handleIngredientChange(e)}
        disabled={ingredients.includes(ingredient)}
      >
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

