import React, { useEffect, useState } from 'react';
import './App.css';
import {getOrders, addOrder} from '../../apiCalls';
import {Orders} from '../../components/Orders/Orders';
import {OrderForm} from '../../components/OrderForm/OrderForm';

export const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getOrders()
      .then(orders => setOrders(orders.orders))
      .catch(err => setErrorMessage(err.message));
  }, [])

  const addNewOrder = order => {
    addOrder(order)
      .then(newOrder => setOrders([...orders, newOrder]))
      .catch(err => setErrorMessage(err.message))
  }

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={addNewOrder}/>
        </header>
      {!!errorMessage && <h2>{errorMessage}</h2>}
      {!!orders.length && !errorMessage && <Orders orders={orders}/>}      
</main>
    );
}


