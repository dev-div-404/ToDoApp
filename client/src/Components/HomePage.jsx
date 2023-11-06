import React from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  
  const navigate = useNavigate()

  const handelSignIn = () =>{
    navigate('/login')
  }

  const handelSignUp = () =>{
    navigate('/signup')
  }

  return (
    <div className='homepage'>
        <div className='desc-container'>
            <div className='app-name'>
                Welcome to ToDo App
            </div>
            <div className='app-name my-name'>
              d i b y e n d u
            </div>
        </div>
        <div className='homepage-btns-container'>
          <button onClick={handelSignIn}>sign in</button>
          <button onClick={handelSignUp}>sign up</button> 
        </div>
    </div>
  )
}

export default HomePage