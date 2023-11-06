import React, { useState } from 'react'
import './LogInForm.css'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import server_url from './../helper'

const LogInForm = () => {

    axios.defaults.withCredentials = true; 

    const navigate = useNavigate()

    const [info,setInfo] = useState({
        email : '',
        passcode : ''
    })

    const changeEmailHandler = (e) =>{
        setInfo({...info, email: e.target.value})
    }
    const changePassHandler = (e) =>{
        setInfo({...info, passcode: e.target.value})
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        axios.post(`${server_url}/loginrequest`,info).then(res => {
            console.log(res);
            if(res.status === 200)
            {
                navigate('/dashboard')
            }else if(res.status === 201){
                alert(res.data.message)
            }
        }).catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              console.error('Response error:', error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              console.error('No response received');
            } else {
              // Something happened in setting up the request
              console.error('Request error:', error.message);
            }
          });

        setInfo({
            email : '',
            passcode : ''
        })
    }

  return (
    <div className='loginform'>
        <h3>Log In</h3>
        <form onSubmit={submitHandler} className='loginformitself'>
            <input type='email' placeholder='type email' value={info.email} required onChange={changeEmailHandler}></input>
            <input type='password' placeholder='passcode' value={info.passcode} required onChange={changePassHandler}></input>
            <input type='submit' value= 'Log In'></input>
        </form>
        <Link to = '/signup' id='signuplink'>
            sign up
        </Link>
    </div>
  )
}

export default LogInForm