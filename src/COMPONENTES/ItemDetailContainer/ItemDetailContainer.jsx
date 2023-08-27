import { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import ItemDetail from '../ItemDetail/ItemDetail';
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import './itemDetailContainer.css';


const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { getProductById } = useContext(CartContext);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (itemId) {
                    const filteredProduct = await getProductById(itemId);
                    setProduct(filteredProduct);
                } else {
                    console.log("El producto no encontrado");
                }
            } catch (error) {
                console.error("Error encontrando datos", error);
            }
        };
        fetchData();
    }, [itemId, getProductById]);

    return (
        <Container fluid className="main vw-100">
            <div className="d-flex justify-content-center align-items-center pt-3">
              <ItemDetail {...product} />
            </div>
        </Container>
    );
}

export default ItemDetailContainer;