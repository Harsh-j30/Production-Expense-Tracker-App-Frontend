import React,{useState,useEffect} from 'react'
import {Form,Input,message} from 'antd'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Components/Spinner';


const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading]=useState(false)
    //form submit handler
    const submitHandler =async (values)=>{
        try{
            setLoading(true)
        //    await axios.post('/api/v1/users/register', values)
        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/users/register`,values)

            message.success('Registration Successful')
            setLoading(false)
            navigate('/login')

        }
        catch(error){
            setLoading(false)
            message.error('Invalid Email or Password')
        }
        
    };
        // prevent for login user
        useEffect(()=>{
            if(localStorage.getItem("user"))
            {
                navigate("/")
            }
        },[navigate]);
  return (
    <> 
        <div className ='register-page'>
            {loading && <Spinner />}
            <Form layout='vertical' onFinish={submitHandler}>
                <h1>Register Page</h1>
                <Form.Item label="Name" name="name">
                    <Input/>
                </Form.Item>
                 <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                 <Form.Item label="Password" name="password">
                    <Input type="password"/>
                </Form.Item>

                <div className='d-flex justify-content-between'>
                    <Link to="/login">Already Register? Click Here to Login</Link>
                    <button className='btn btn-primary'>Register</button>
                </div>
            </Form>
        </div>
    </>
    
  )
}

export default Register
