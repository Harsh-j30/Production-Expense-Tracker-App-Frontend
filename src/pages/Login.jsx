// import React,{useState,useEffect} from 'react'
// import {Form,Input,message} from 'antd'
// import { Link,useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import Spinner from '../Components/Spinner'

// const Login = () => {
//       const navigate=useNavigate();
//       const [loading,setLoading]=useState(false)
//       // login form handler
//       const submitHandler = async(values)=>{

//           try{
//            setLoading(true)
//           //  const {data}= await axios.post('/api/v1/users/login', values)
//           axios.post( `${process.env.REACT_APP_API_URL}/api/v1/users/login`, values );

//            message.success('Login Successfully')
//            localStorage.setItem('user',JSON.stringify({...data,password:''}))
//            setLoading(false)
//            navigate('/')
//           }
//           catch(error){
//             setLoading(false)
//             message.error('Invalid Email or Password')
//           }
//       };

//        useEffect(()=>{
//            if(localStorage.getItem("user"))
//                {
//                    navigate("/")
//                }
//           },[navigate]);
  
//     return (
//       <> 
//           <div className='register-page'>
//             {loading && <Spinner/>}
//               <Form layout='vertical' onFinish={submitHandler}>
//                   <h1>Login Page</h1>
    
//                    <Form.Item label="Email" name="email">
//                       <Input type="email"/>
//                   </Form.Item>
//                    <Form.Item label="Password" name="password">
//                       <Input type="password"/>
//                   </Form.Item>
  
//                   <div className='d-flex justify-content-between'>
//                       <Link to="/register"> If Not a User? Click Here to Register</Link>
//                       <button className='btn btn-primary'>Login</button>
//                   </div>
//               </Form>
//           </div>
      
//     </>
//   )
// }

// export default Login

import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/login`,
        values
      );

      message.success("Login Successfully");

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data,
          user: { ...data.user, password: "" },
        })
      );

      setLoading(false);
      navigate("/dashboard");

    } catch (error) {
      setLoading(false);
      message.error("Invalid Email or Password");
    }
  };

  useEffect(() => {
  if (localStorage.getItem("user")) {
    navigate("/dashboard");
  }
}, [navigate]);


  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login Page</h1>

          <Form.Item label="Email" name="email" required>
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Password" name="password" required>
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/register">If Not a User? Click Here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
