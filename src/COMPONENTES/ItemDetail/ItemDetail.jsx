import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
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
    <div className='d-flex aling-items-center' >
      <Card style={{ width: '60vw', }} className='text-center abs-center'>
        <Card.Img className='aling-items-center' style={{ width: '30vw'}} variant="top" src={img} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{name}</Card.Title>
          <Card.Text>
              <p>{details}</p>
              <p>Precio: $ {price} COP</p>
          </Card.Text>
          {
            productsAdded > 0?(
              <div className='text-center'>
                <Button variant="success" className="mt-2 mb-2  w-50 linkStyle"><Link to='/cart' className='text-white text-decoration-none linkStyle'>Finalizar Compra</Link></Button>
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
