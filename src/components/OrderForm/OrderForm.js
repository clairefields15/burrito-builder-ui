import React, {useState} from 'react';

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
    this.clearInputs();
  }

  const clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
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
        value={this.state.name}
        onChange={e => this.handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => this.handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

