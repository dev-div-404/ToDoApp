import React, { useState } from 'react'
import './LogInForm.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import server_url from './../helper'

const SignUpForm = () => {

    const [info,setInfo] = useState({
        name :'',
        email : '',
        passcode : ''
    })

    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const changeNameHandler = (e) =>{
        setInfo({...info, name: e.target.value})
    }
    const changeEmailHandler = (e) =>{
        setInfo({...info, email: e.target.value})
    }
    const changePassHandler = (e) =>{
        setInfo({...info, passcode: e.target.value})
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`${server_url}/signuprequest`,info).then(res => {
            if(res.status === 200){
                alert(res.data.message)
                navigate('/login')
            }else if(res.status === 201){
                alert(res.data.message)
                navigate('/login')
            }else
            {
                alert('sign up failed')
            }
        }).catch(err =>{
            console.log(err)
        })

    }

  return (
    <div className='loginform' id = 'signupform'>
        <h3>Sign UP</h3>
        <form onSubmit={submitHandler} className='loginformitself' id = 'signupform'>
            <input type='text' placeholder='type name' required onChange={changeNameHandler}></input>
            <input type='email' placeholder='type email' required onChange={changeEmailHandler}></input>
            <input type='password' placeholder='passcode' required onChange={changePassHandler}></input>
            <input type='submit' value= 'Sign Up'></input>
        </form>
        <Link to = '/login' id='signuplink'>
            sign in
        </Link>

    </div>
  )
}

export default SignUpForm