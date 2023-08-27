import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { RiShoppingCartLine } from "react-icons/ri";
import './cartWidget.css';

const CartWidget = () => {
  const {cart} = useContext(CartContext);
  const quantity = cart.reduce((total,product)=> total + product.quantity,0);
  return (
      
      <Link to='/cart' className='text-white text-decoration-none d-flex align-items-center custom-badge'>
        <RiShoppingCartLine size={20} className="custom-badge" />
        <span className="ms-1 custom-badge fs-6">{quantity}</span>
      </Link>
    
  );
};

export default CartWidget;