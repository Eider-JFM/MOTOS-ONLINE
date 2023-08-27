import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './itemListContainer.css';
import Load from'../Load/Load'
import ItemList from '../ItemList/ItemList';
import Paginator from '../NumPag/NumPag'
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";

const ItemListContainer = ({ props, productSearched }) => {
  const {products, getProductsByCategory} = useContext(CartContext);
  const [productsFilter, setProductsFilter] = useState([])
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {category} = useParams();
  console.log(productSearched);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productSearched){
          const filteredProducts = products.filter(product => product.name.includes(productSearched) || product.details.includes(productSearched))
          setProductsFilter(filteredProducts);
        }else if (category) {
          const filteredProducts = await getProductsByCategory(category);
          setProductsFilter(filteredProducts);
        } else {
          setProductsFilter(products);
        }
        setLoader(false);
      } catch (error) {
        console.error("Error encontrando datos", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, getProductsByCategory, products]);
 

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(productsFilter?.length / itemsPerPage);

  const filteredProducts = productsFilter?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container fluid className="main">
      {
        loader?(
          <Row className="justify-content-center">
          <Col xs={12} className="text-center pt-2">
            <Load />
            <p>Cargando productos ...</p>
          </Col>
          </Row>
        ):(
          <Row className="justify-content-center">
          <Col xs={12} className="text-center pt-2">
            <h1>{props}</h1>
          </Col>
          <Col xs={12} className="pt-2">
            <ItemList props={filteredProducts} />
          </Col>
          <Col xs={12} className="text-center">
            <Paginator
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Col>
        </Row>
        )
      }
    </Container>
  );
};

export default ItemListContainer;