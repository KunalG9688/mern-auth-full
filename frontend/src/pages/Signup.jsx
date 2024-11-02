import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
// import { signup } from '../../../backend/Controllers/AuthController'

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState ({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name, value} = e.target;
        console.log(name, value);
        const copysignupInfo = {...signupInfo};
        copysignupInfo[name] = value;
        setSignupInfo(copysignupInfo);
    }
    console.log('signupInfo ->',signupInfo)
    const handleSignup = async (e) =>{
        e.preventDefault();
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
            return handleError('name, email and password are required')
        }
        try {
            const url = 'http://localhost:8080/auth/signup';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json(); // corrected line
            const {success, message,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/')
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
        <h1>Sign Up</h1>
        <form onSubmit={handleSignup}>
            <div>
                <label>Name</label>
                <input
                onChange={handleChange}
                value={signupInfo.name}
                type='text'
                name='name'
                autoFocus
                placeholder='Enter your name' />
            </div>
            <div>
                <label>Email</label>
                <input 
                onChange={handleChange}
                value={signupInfo.email}
                type='email'
                name='email'
                autoFocus
                placeholder='Enter your email' />
            </div>
            <div>
                <label>Password</label>
                <input 
                onChange={handleChange}
                value={signupInfo.password}
                type='password'
                name='password'
                autoFocus
                placeholder='Enter your password' />
            </div>
            <button type='submit'>Sign Up</button>
            <span>Already have an account ? <Link to='/login'>Login</Link></span>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Signup