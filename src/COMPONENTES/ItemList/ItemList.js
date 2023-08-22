import Item from '../Item/Item'

const ItemList = ({props}) => {
    return(
        <div className='d-flex flex-wrap gap-3 justify-content-center align-center'>
            {props?.map(product => <Item key={product.id} props={product}/>)}
        </div>
    );
}

export default ItemList;