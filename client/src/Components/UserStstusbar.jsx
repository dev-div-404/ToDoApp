import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import server_url from './../helper'

const UserStstusbar = (props) => {

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const logOutListner = () =>{
        axios.get(`${server_url}/logout`).then(res =>{
            console.log("Logged out")
            navigate('/')
      }).catch(err =>{
        console.error(err);
      })
    }

  return (
    <div className='user-status-bar'>
        <div className='user-statusbar-element user-statusbar-name'>
            Welcome {props.userName} !
        </div>
        <div className='user-statusbar-element '>
            <button className='user-statusbar-logout' onClick={logOutListner}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default UserStstusbar