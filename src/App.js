import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ContactUs from './pages/ContactUs';
import ShowProduct from './pages/ShowProducts';
import ManageProduct from './pages/ManageProducts';
import AddProduct from './pages/AddProducts';
import EditProduct from './pages/EditProducts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import fetchSessionData from './auth/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    const authenticateUser = async ()=>{
      try {
        const isAuthenticated = await fetchSessionData();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    if(!isAuthenticated){
      authenticateUser();
    } else{
      setLoading(false);
    }
  }, [isAuthenticated]);

  if(loading){
    return <div>Loading....</div>
  }
  return (<>
    <Routes>
      <Route path='/' element={!isAuthenticated ? <Login /> : <Navigate to='/manageProduct' />} />
      <Route path='/signUp' element={<SignUp />} />
      <Route path='/contact' element={isAuthenticated ? <ContactUs /> : <Navigate to='/' />} />
      <Route path='/showProduct' element={isAuthenticated ? <ShowProduct /> : <Navigate to='/' />} />
      <Route path='/manageProduct' element={isAuthenticated ? <ManageProduct /> : <Navigate to='/' />} />
      <Route path='/addProduct' element={isAuthenticated ? <AddProduct /> : <Navigate to='/' />} />
      <Route path='/editProduct/:pid' element={isAuthenticated ? <EditProduct /> : <Navigate to='/' />} />
    </Routes>
  </>);
}

export default App;
