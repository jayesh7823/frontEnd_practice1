import React, { useState } from "react";
import Menu from "../common/Navbar";
import {Container, Form} from "react-bootstrap";
import axios from 'axios';

export default function ContactUs(){
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [message, setMessage] = useState("");
    // const [inform, setInform] = useState("");
    
    // const contact = (args)=>{
    //     args.preventDefault();
    //     if(name===""||email===""||phone===""||message===""){
    //         document.getElementById("msg").innerHTML = setInform("Fill the Details");
    //     } else{
    //         document.getElementById("msg").innerHTML = setInform("Contact Info Added Successfully");
    //     }
    // }

    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8000/contactUs', formData);
            console.log('Form Data Sent Successfully', response.data);

            if(response.status === 200){
                alert(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                })
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    return(<>
            <Menu />
            <Container className="w-75" id="form-margin">
                <h2>Contact Us</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name:</Form.Label>
                        <Form.Control value={formData.name} onChange={handleChange} type="text" name="name" className="" id="name" placeholder="Enter your name.." required />
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
                        <Form.Label htmlFor="role">Message:</Form.Label>
                        <Form.Control value={formData.message} onChange={handleChange} as="textarea" className="" name="message" id="role" rows="3" required></Form.Control>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary">Send</button>
                </Form>
            </Container>
    </>);
}