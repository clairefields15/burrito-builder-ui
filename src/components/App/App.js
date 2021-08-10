import React, { useEffect } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

export const App = () => {


  useEffect(() => {
    getOrders()
      .then(order => console.log(order))
      .catch(err => console.error('Error fetching:', err));
  }, [])

    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm />
        </header>

        {/* <Orders orders={this.state.orders}/> */}
      </main>
    );
}


