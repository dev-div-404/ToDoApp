import React, { useEffect } from 'react'
import LogInForm from './LogInForm'
import './LogInPage.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import server_url from './../helper'

export const LogInPage = () => {

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  
  useEffect(()=>{
    axios.get(`${server_url}/getuser`).then(res =>{
        if(res.data.loggedIn){
            navigate('/dashboard')
        }
    }).catch(err =>{
      console.error(err);
    })
  },[navigate])

  return (
    <div>
        
        <div className='container'>
          <div className='loginformspace'>
            <LogInForm />
          </div>
        </div>
    </div>
  )
}
