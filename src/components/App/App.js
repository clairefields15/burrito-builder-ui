import React, { useEffect, useState } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import {Orders} from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

export const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [orders, setOrders] = useState([])


  useEffect(() => {
    getOrders()
      .then(orders => setOrders(orders.orders))
      .catch(err => setErrorMessage(err.message));
  }, [])

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>
      {!!errorMessage && !orders.length && <h2>{errorMessage}</h2>}
      {!!orders.length && !errorMessage && <Orders orders={orders}/>}      
</main>
    );
}


