import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './Context/CartContext';
import ItemDetailContainer from './COMPONENTES/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './COMPONENTES/ItemListContainer/ItemListContainer';
import NavBar from './COMPONENTES/NavBar/NavBar';
import Cart from './COMPONENTES/Cart/Cart';
import Checkout from './COMPONENTES/Checkout/Checkout';
import './App.css';


function App() {
  const [productSearched, setProductSearched] = useState('');
  console.log(productSearched);

  return (
    <>
      <BrowserRouter basename='/TIENDA-DGT'>
        <StoreProvider>
          <NavBar setProductSearched= {setProductSearched}/>
            <Routes>
              <Route path='/' element={<ItemListContainer props = {'Bienvenido a TIENDA DGT'} productSearched={productSearched}/>}/>
              <Route path='/category/:category' element={<ItemListContainer />}/>
              <Route path='/item/:itemId' element={<ItemDetailContainer />}/>
              <Route path='/cart' element={<Cart />}/>
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='*' element={<h1>404 NOT FOUND</h1>}/>
            </Routes>
        </StoreProvider>
      </BrowserRouter>
    </>
  );
}

export default App