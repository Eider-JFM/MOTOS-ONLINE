import { useState, useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import './itemListContainer.css';
import Load from'../Load/Load'
import ItemList from '../ItemList/ItemList';
import NumPag from '../NumPag/NumPag'
import { useParams } from "react-router-dom";
import { CartContext } from "../../CONTEXT/CartContext";

const ItemListContainer = ({ props, productSearched }) => {
  const {products, getProductsByCategory} = useContext(CartContext);
  const [productsFilter, setProductsFilter] = useState([])
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {categoryId} = useParams();
  console.log(productSearched);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productSearched){
          const filteredProducts = products.filter(product => product.name.includes(productSearched) || product.desc.includes(productSearched))
          setProductsFilter(filteredProducts);
        }else if (categoryId) {
          const filteredProducts = await getProductsByCategory(categoryId);
          setProductsFilter(filteredProducts);
        } else {
          setProductsFilter(products);
        }
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [categoryId, getProductsByCategory, products]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);



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
            <p>Cargando nuestros productos ...</p>
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
            <NumPag
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