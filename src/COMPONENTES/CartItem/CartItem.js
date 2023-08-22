import { useContext } from "react";
import { CartContext } from "../../CONTEXT/CartContext";
import { HiOutlineTrash } from 'react-icons/hi';
import './CartItem.css';


const CartItem = ({product, index}) => {
    const { removeItemFromCart } = useContext(CartContext);
    const subtotal = product.quantity * product.value;
    const rowClass = index % 2 === 0 ? "evenRow" : "oddRow";

    return(
        <tr>
            <td className={rowClass}>{product.name}</td>
            <td className={rowClass}>{product.quantity}</td>
            <td className={rowClass}>${product.value}</td>
            <td className={`${rowClass} d-flex align-items-center justify-content-around`}>${subtotal}<HiOutlineTrash onClick={()=>removeItemFromCart(product.id)} size={24} /></td>
        </tr>
    )
}

export default CartItem;