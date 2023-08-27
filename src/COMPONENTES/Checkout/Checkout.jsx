import { addDoc, collection, documentId, getDocs, query, Timestamp, where, writeBatch } from "firebase/firestore";
import { useState } from "react";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { CartContext } from "../../Context/CartContext";
import { db } from '../../Firebase/config';
import Load from '../Load/Load';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
const Checkout = () => {
    const {cart, cleanCart} = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState("");
    const totalProductsValue = cart.reduce((total, product) => total + product.quantity * product.price, 0);

    const createOrder = async({ name, phone, email}) => {
        try {
            const order = {
                buyer:{
                    name, phone, email
                },
                items: cart,
                total: totalProductsValue,
                date: Timestamp.fromDate(new Date())
            }

            const batch = writeBatch(db);
            const outOfStock = [];
            const ids = cart.map(product => product.id);
            const productsRef = collection(db, 'PRODUCTOS');
            const productsFromFirebase = await getDocs(query(productsRef, where(documentId(), 'in', ids)));
            const  { docs } = productsFromFirebase;
            docs.forEach(doc => {
                const dataDoc = doc.data();
                const stockDb = dataDoc.stock;
                const productAddedToCart = cart.find(product => product.id === doc.id);
                const productQuantity = productAddedToCart?.quantity;

                (stockDb >= productQuantity )?batch.update(doc.ref, {stock: stockDb - productQuantity}):outOfStock.push({id: doc.id, ...dataDoc});
            })

            if (outOfStock.length === 0){
                await batch.commit();
                const orderRef = collection(db, 'orders');
                const orderAdded = await addDoc(orderRef, order);
                setOrderId(orderAdded.id);
                cleanCart();
            }else{
                console.error('Producto sin suficiente stock');
            }
        } catch (error) {
            console.error(error)
        }finally{
            setLoading(false);
        }
    }

    if(loading){<Load />};
    if(orderId){
        return (
            <Container fluid className="main vh-100 pt-3 d-flex flex-column justify-items-center align-items-center">
                <h1>El Id de su orden es: {orderId}</h1>
            </Container>
        )
    }
    return(
        <Container fluid className="vh-100 main">
            <h1 className="text-center">Checkout</h1>
            <CheckoutForm onConfirm={createOrder} />
        </Container>
    )

}

export default Checkout;