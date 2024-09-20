import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../common/Navbar";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";

export default function SignUp(){
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    // const [address ,setAddress] = useState("");
    // const [message, setMessage] = useState("");

    // const signUp = (args)=>{
    //     args.preventDefault();
    //     if(name==="" || email==="" || phone==="" || password==="" || address===""){
    //         document.getElementById("msg").innerHTML = setMessage("Fill the details")
    //     } else {
    //         document.getElementById("msg").innerHTML = setMessage("Login Successful");
    //     }
    // }
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        address: ''
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData(prevState=>({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8000/signUp', formData);
            console.log(response);

            if(response.status === 200){
                alert("You Signed Up Successfully");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    address: ''
                })
                navigate("/showProduct");
            }
        } catch (error) {
            console.error("Error While SignUp", error);
        }
    }
    return(<>
        <Menu />
        <Container className="w-75" id="form-margin">
            <h2>User Registration</h2>
            <Form onSubmit={handleSubmit} action="" method="post" encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="text">Name:</Form.Label>
                    <Form.Control value={formData.name} onChange={handleChange} type="text" name="name" className="" id="name" placeholder="Enter your email.." required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Email:</Form.Label>
                    <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" className="" id="email" placeholder="Enter your email.." required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone">Phone Number:</Form.Label>
                    <Form.Control value={formData.phone} onChange={handleChange} type="tel" name="phone" className="" id="phone"  placeholder="Enter your Phone.." required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Password:</Form.Label>
                    <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" className=""  placeholder="Enter your password.." id="password" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="role">Address:</Form.Label>
                    <Form.Control value={formData.address} onChange={handleChange} as="textarea" className="" name="address" id="role" rows="3" required></Form.Control>
                </Form.Group>
                <Button type="submit" className="btn btn-primary">Register</Button>&nbsp;<Link to="/">Click here to login!</Link>
            </Form>
            {/* <p id="msg">{message}</p> */}
        </Container>
    </>);
}