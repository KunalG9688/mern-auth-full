import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
// import { signup } from '../../../backend/Controllers/AuthController'

const Login = () => {

    const [loginInfo, setLoginInfo] = useState ({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copyloginInfo = {...loginInfo};
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo);
    }
    console.log('loginInfo ->',loginInfo)
    const handlelogin = async (e) =>{
        e.preventDefault();
        const { email, password} = loginInfo;
        if(!email || !password){
            return handleError('email and password are required')
        }
        try {
            const url = 'http://localhost:8080/auth/login';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json(); // corrected line
            const {success, message,jwtToken,name,error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(()=>{

                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handlelogin}>
            <div>
                <label>Email</label>
                <input 
                onChange={handleChange}
                value={loginInfo.email}
                type='email'
                name='email'
                autoFocus
                placeholder='Enter your email' />
            </div>
            <div>
                <label>Password</label>
                <input 
                onChange={handleChange}
                value={loginInfo.password}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter your password' />
            </div>
            <button type='submit'>Login</button>
            <span>Does't have an account ? <Link to='/signup'>Sign Up</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Login