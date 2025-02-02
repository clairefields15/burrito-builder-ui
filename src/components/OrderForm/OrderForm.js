import React, {useState} from 'react';
import './OrderForm.css'

const possibleIngredients = [
  'beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 
  'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 
  'jalapenos', 'cilantro', 'sour cream'
];

export const OrderForm = ({addNewOrder}) => {
  const [name, setName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [disabled, setDisabled] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const handleNameChange = e => {
    e.preventDefault();
    setName(e.target.value)
  }

  const handleIngredientChange = e => {
    e.preventDefault()

    const duplicates = ingredients.filter(ingredient => {
      return ingredient === e.target.name
    })

    if (duplicates.length < 1) {
      setIngredients([...ingredients, e.target.name])
    } else if (duplicates.length === 1) {
      setIngredients([...ingredients, e.target.name])
      setDisabled([...disabled, e.target.name])
    }
  }

    const handleSubmit = e => {
    e.preventDefault();
    setErrorMessage('')
    if (name && ingredients.length) {
      let newOrder = {
        name: name,
        ingredients: ingredients
      }
      addNewOrder(newOrder)
      clearInputs();
    } else {
      setErrorMessage('Make sure your order has a name and at least one ingredient')
    }

  }

  const clearInputs = () => {
    setName('')
    setIngredients([])
    setDisabled([])
  }

  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button 
        key={ingredient} 
        name={ingredient} 
        onClick={e => handleIngredientChange(e)}
        disabled={disabled.includes(ingredient)}
        className="ing-button"
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

    <div className="button-container">
          { ingredientButtons }
    </div>

      {!!errorMessage && <p className="error-msg">{errorMessage}</p>}

      <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

      <button name="submit" onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

