import React from 'react';
import './App.css';
import KittyCard from './components/KittyCard/KittyCard'
import mock from './sample-data.json'

class Product {
  constructor({ id, flavoured = '', weight = 0, description = '', available = true }) {
    this.id = id
    this.flavoured = flavoured
    this.description = description
    this.weight = weight
    this.available = available
  }
  get portions() { return this.weight * 20 }
  get gift() { return Math.trunc(this.portions / 20) }
}

function App() {

  //--- Заглушка под корзину, проверить обратную связь
  const cart = new Set()
  const updateCart = (id) => {
    try {
      if (!cart.has(id)) cart.add(id)
      else cart.delete(id)
    }
    catch (e) {
      //throw new Error(e)
    }
  }

  const products = mock
    .map(x => new Product(x))
    .map(x => <KittyCard data={x} updateCart={updateCart} key={x.id} />)

  return (
    <div className="App">
      <header className="App-header">
        Ты сегодня покормил кота?
      </header>      
      <div className='Product-Container'>
        {products}
      </div>
    </div>
  );
}

export default App;
