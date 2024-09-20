import React, { useState } from "react";
import Menu from "../common/Navbar";
import {Button, Container, Form} from "react-bootstrap"
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function EditProduct(){

    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pid: location.state.product._id,
        name: location.state.product.name,
        price: location.state.product.price,
        description: location.state.product.description,
        image: location.state.product.image
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleFileChange = (e)=>{
        setFormData(prevState=>({
            ...prevState,
            image: e.target.files[0]
        }))
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('pid', formData.pid)
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);
        
        
        try {
            const response = await axios.post('http://localhost:8000/updateProduct', formDataToSend);
            console.log(response);
            if(response.status === 200){
                alert('Product Updated Successfully');
                navigate('/manageProduct');
            }
        } catch (error) {
            console.log(error);
            alert('error Occurred');
        }
    }
    return(<>
            <Menu />
            <Container className="w-75" id="form-margin">
                <h2>Edit Product Data</h2>
                <Form onSubmit={handleSubmit} enctype="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label for="productName">Product Name:</Form.Label>
                        <Form.Control value={formData.name} onChange={handleChange} type="text" name="name" className="" id="productName" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label for="productPrice">Product Price:</Form.Label>
                        <Form.Control value={formData.price} onChange={handleChange} type="number" name="price" className="" id="productPrice" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label for="productDescription">Product Description:</Form.Label>
                        <Form.Control value={formData.description} onChange={handleChange} as="textarea" className="" name="description" id="productDescription" rows="3" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <img src={`http://localhost:8000/images/${formData.image}`} alt="..." height="15%" width="15%" /><br />
                        <Form.Label for="productImage">Product Image:</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleFileChange} className="" id="productImage" accept="image/*"  />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="">Update</Button>
                </Form>
            </Container>
    </>);
}