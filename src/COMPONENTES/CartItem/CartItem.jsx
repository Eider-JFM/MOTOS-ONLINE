import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { TbShoppingCartX } from 'react-icons/tb';
import './CartItem.css';


const CartItem = ({product, index}) => {
    const { removeItemFromCart } = useContext(CartContext);
    const subtotal = product.quantity * product.price;
    const rowClass = index % 2 === 0 ? "evenRow" : "oddRow";

    return(
        <tr>
            <td className={rowClass}>{product.name}</td>
            <td className={rowClass}>{product.quantity}</td>
            <td className={rowClass}>${product.price}</td>
            <td className={`${rowClass} d-flex align-items-center justify-content-around`}>${subtotal} COP <TbShoppingCartX onClick={()=>removeItemFromCart(product.id)} size={20} /></td>
        </tr>
    )
}

export default CartItem;