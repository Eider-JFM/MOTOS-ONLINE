import { useContext } from "react";
import { CartContext } from "../../CONTEXT/CartContext";
import { Link } from "react-router-dom";
import { Cart4 } from "react-bootstrap-icons";
import { Badge } from "react-bootstrap";
import './cartWidget.css';

const CartWidget = () => {
  const {cart} = useContext(CartContext);
  const quantity = cart.reduce((total,product)=> total + product.quantity,0);
  return (
    <Badge pill className="d-flex align-items-center custom-badge">
      <Link to='/cart' className='text-white text-decoration-none'>
        <Cart4 size={24} className="custom-badge" />
        <span className="ms-1 custom-badge fs-6">{quantity}</span>
      </Link>
    </Badge>
  );
};

export default CartWidget;