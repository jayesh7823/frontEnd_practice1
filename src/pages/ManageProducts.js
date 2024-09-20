import { useEffect, useState } from "react";
import Menu from "../common/Navbar";
import {Container, Table} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function ManageProduct(){
    const [productData, setProductData] = useState([]);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const fetchProductData = async ()=>{
        try {
            const response = await axios.get('http://localhost:8000/products');
            console.log(response);
            setProductData(response.data.proData);
        } catch (error) {
            console.log('Error fetching product data');
        }
    };

    useEffect(()=>{
        fetchProductData();
    }, []);

    const deleteProduct = async (pid)=>{
        try {

            const response = await axios.post('http://localhost:8000/deleteProduct', {pid});
            console.log(response);
            alert("Product Deleted Successfully");
            fetchProductData();
            
        } catch (error) {
            console.error('Error Deleting products', error);
        }
    }

    useEffect(()=>{
        const fetchSessionData = async ()=>{
            try {
                const response = await axios.get('http://localhost:8000/session');
                console.log(response);
                if(response.data){
                    setUserName(response.data.sessionData.session.name);
                } 
            } catch (error) {
                console.error('Error Fetching Session Data', error);
            }
        } 

        fetchSessionData();
    }, []);

    async function logout(){
        const response = await axios.post('http://localhost:8000/logout');
        console.log(response);
        if(response.status===200){
            alert("Logout Successful")
            window.location.reload();
        }
    }
    return(<>
            <Menu />
            <Container className="w-75" id="form-margin">
                <h2>Manage Product Details</h2>
                <h2>Hello {userName}</h2><button onClick={logout} className="btn btn-danger mb-3 ml-2">Logout</button>
                    <Table responsive className="text-center">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Price</th>
                                <th>Product Description</th>
                                <th>Product Image</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody id="productTableBody">
                            {productData.map(product =>(
                                <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td><img src={`http://localhost:8000/images/${product.image}`} alt="" height="30%" width="30%" /></td>
                                <td><Link to={`/editProduct/${product._id}`} state={{product}} className="btn bg-success text-white">Edit</Link></td>
                                <td><a href="#delete" onClick={()=>deleteProduct(product._id)} className="btn bg-danger text-white">Delete</a></td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
            </Container>
    </>)
}