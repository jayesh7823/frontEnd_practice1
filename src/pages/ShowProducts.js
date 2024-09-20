import { useEffect, useState } from "react";
import Menu from "../common/Navbar";
import {Card, Col, Container, Row} from 'react-bootstrap';
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShowProduct(){
    const [productDate, setProductData] = useState([]);

    useEffect(()=>{
        const fetchProductData = async () =>{
            try {
                const response = await axios.get('http://localhost:8000/products');
                console.log(response);
                setProductData(response.data.proData);
            } catch (error) {
                console.error('Error while Fetching', error);
            }
        }
        fetchProductData();
    }, []);
    return(<>
            <Menu />
            <Container className="w-75" id="form-margin">
                <h2>Product Details</h2>
                <Link as={Link} to="/addProduct"  className="btn btn-success mb-3">Add Product</Link>

                <Row xs={1} md={3} className="g-4">
                    {productDate.map((value, idx)=>(
                        <Col key={idx}>
                            <Card className="mb-4 product-card">
                                    <Card.Img variant="top" src={`http://localhost:8000/images/${value.image}`} alt="Product 1" className="product-img" />
                                    <Card.Body className="">
                                        <Card.Title className="">{value.name}</Card.Title>
                                        <Card.Text className=""> {value.price}</Card.Text>
                                    </Card.Body>
                            </Card>
                        </Col>
                    ))}


                    {/* <Col>
                        <Card className="mb-4 product-card">
                                <Card.Img variant="top" src="https://via.placeholder.com/400" alt="Product 2" className="product-img" />
                                <Card.Body className="">
                                    <Card.Title className="">Product 2</Card.Title>
                                    <Card.Text className="">Rs.75</Card.Text>
                                </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mb-4 product-card">
                                <Card.Img variant="top" src="https://via.placeholder.com/400" alt="Product 3" className="product-img" />
                                <Card.Body className="">
                                    <Card.Title className="">Product 3</Card.Title>
                                    <Card.Text className="">Rs.60</Card.Text>
                                </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mb-4 product-card">
                                <Card.Img variant="top" src="https://via.placeholder.com/400" alt="Product 4" className="product-img" />
                                <Card.Body className="">
                                    <Card.Title className="">Product 4</Card.Title>
                                    <Card.Text className="">Rs.45</Card.Text>
                                </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mb-4 product-card">
                                <Card.Img variant="top" src="https://via.placeholder.com/400" alt="Product 5" className="product-img" />
                                <Card.Body className="">
                                    <Card.Title className="">Product 5</Card.Title>
                                    <Card.Text className="">Rs.55</Card.Text>
                                </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="mb-4 product-card">
                                <Card.Img variant="top" src="https://via.placeholder.com/400" alt="Product 6" className="product-img" />
                                <Card.Body className="">
                                    <Card.Title className="">Product 6</Card.Title>
                                    <Card.Text className="">Rs.70</Card.Text>
                                </Card.Body>
                        </Card>
                    </Col> */}
                </Row>
            </Container>
    </>);
}