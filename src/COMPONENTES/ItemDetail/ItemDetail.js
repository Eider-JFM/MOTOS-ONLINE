import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../CONTEXT/CartContext';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import ItemCount from '../ItemCount/ItemCount';
import { useContext } from 'react';
import './ItemDetail.css';

const ItemDetail = ({id, name, img, price, details, category, stock}) => {
  const [productsAdded, setProductsAdded] = useState(0);
  const { addItemToCart } = useContext(CartContext);

  const handleAddProduct = ( quantity ) => {
    setProductsAdded(quantity);
    const item={ id, name, price };
    addItemToCart(item, quantity);
  }

  return(
    <div className='d-flex aling-items-center'>
      <Card style={{ width: '21rem'}}>
        <Card.Img variant="top" src={img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
              <p>{details}</p>
              <p>Precio: ${price}</p>
          </Card.Text>
          {
            productsAdded > 0?(
              <div className='text-center'>
                <Button variant="success" className="mt-2 mb-2  w-50 linkStyle"><Link to='/cart' className='text-white text-decoration-none linkStyle'>Terminar compra</Link></Button>
              </div>
            ):(
              < ItemCount initial={1} stock={stock} onAdd={handleAddProduct}/>
            )
          }


        </Card.Body>
      </Card>
    </div>
  );
}

export default  ItemDetail;













