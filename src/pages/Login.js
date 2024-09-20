import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "../common/Navbar";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";

export default function Login(){
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [message, setMessage] = useState("");

    // const login = (args)=>{
    //     args.preventDefault();
    //     if(email==="" || password===""){
    //         document.getElementById("msg").innerHTML = setMessage("Fill The Details");
    //     } else {
    //         document.getElementById("msg").innerHTML = setMessage("Login Successful");
    //     }
    // }
    
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setLoginData(prevState=>({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(loginData);

        try {
            const response = await axios.post('http://localhost:8000/login', loginData);
            console.log(response);
            if(response.status === 200){
                alert('login successful');
                setLoginData({
                    email: '',
                    password: ''
                })
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            alert('Invalid email or password');
        }
        
    }
    return(<>
        <Menu />
        <Container className="w-75" id="form-margin">
            <h2>User Login</h2>
            <Form onSubmit={handleSubmit} className="" action="" method="post" enctype="multipart/form-data">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label for="email">Username:</Form.Label>
                    <Form.Control value={loginData.email} onChange={handleChange} type="text" name="email" className="form-control" id="email" placeholder="Enter your username.." required />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label for="password">Password:</Form.Label>
                    <Form.Control value={loginData.password} onChange={handleChange} type="password" name="password" className="form-control"  placeholder="Enter you password.." id="password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="">Login</Button>&nbsp;<Link to="/signUp">Create a new account?</Link>
            </Form>
            {/* <p id="msg">{message}</p> */}
        </Container>
    </>);
}