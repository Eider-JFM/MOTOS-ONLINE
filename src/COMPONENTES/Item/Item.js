import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './item.css';

const Item = ({props}) => {
    return (
        <Card style={{ width: '18rem', height: '30rem' }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body className="d-flex flex-column">
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                <p>Stock: {props.stock}</p>
                <p>Precio: ${props.price}</p>
            </Card.Text>
            <Link to={`/item/${props.id}`} className="text-decoration-none linkStyle pt-1 pb-1 text-center rounded">Características</Link>
          </Card.Body>
        </Card>
      );
}

export default Item;