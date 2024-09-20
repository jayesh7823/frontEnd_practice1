import React, { useState } from "react";
import Menu from "../common/Navbar";
import {Button, Container, Form} from "react-bootstrap"
import axios from "axios";

export default function AddProduct(){
    // const [productName, setProductName] = useState("");
    // const [productPrice, setProductPrice] = useState("");
    // const [productDesc, setProductDesc] = useState("");
    // const [message, setMessage] = useState("");
    // const addProduct = (args) => {
    //     args.preventDefault();
    //     if (productName===""|| productPrice===""||productDesc===""){
    //         document.getElementById("msg").innerHTML = setMessage("Failed");
    //     } else {
    //         document.getElementById("msg").innerHTML = setMessage("Success");
    //     }
    // }
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: null
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
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('image', formData.image);
        try {
            const response = await axios.post('http://localhost:8000/addProduct', formDataToSend);
            console.log(response);
            if(response.status === 200){
                alert('Product Added Successfully');
                setFormData({
                    name: '',
                    price: '',
                    description: '',
                    image: null
                })
            }
        } catch (error) {
            console.log(error);
            alert('error Occurred');
        }
    }
    return(<>
            <Menu />
            <Container className="w-75" id="form-margin">
                <h2>Add Product Data</h2>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="productName">Product Name:</Form.Label>
                        <Form.Control value={formData.name} onChange={handleChange} type="text" name="name" className="" id="productName" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="productPrice">Product Price:</Form.Label>
                        <Form.Control value={formData.price} onChange={handleChange} type="number" name="price" className="" id="productPrice" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="productDescription">Product Description:</Form.Label>
                        <Form.Control value={formData.description} onChange={handleChange} as="textarea" className="" name="description" id="productDescription" rows="3" required></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="productImage">Product Image:</Form.Label>
                        <Form.Control type="file" name="image" onChange={handleFileChange} className="" id="productImage" accept="image/*"  />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="">Submit</Button>
                </Form>
                {/* <p id="msg">{message}</p> */}
            </Container>
    </>);
}