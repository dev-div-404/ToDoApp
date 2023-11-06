import React, { useEffect } from 'react'
import axios from 'axios'
import AddTask from './AddTask';
import './UserPage.css'
import ViewTasks from './ViewTasks';
import UserStstusbar from './UserStstusbar';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import server_url from './../helper'

const UserPage = () => {
  axios.defaults.withCredentials = true;

  const [tasks, setTasks] = useState([])
  const [temp, setTemp] = useState([])

  const navigate = useNavigate();
  const [userName, setUserName] = React.useState()

  
  useEffect(() => {
    // Combine both getuser and gettasks in a single useEffect
    axios.get(`${server_url}/getuser`)
      .then(res => {
        console.log('getuser');
        if (res.data.loggedIn) {
          setUserName(res.data.userName);
          return axios.get(`${server_url}/gettasks`);
        } else {
          alert('Need to log in first');
          navigate('/login');
        }
      })
      .then(res => {
        setTasks(res.data.tasks);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  
  return userName ? (
    <div>
        <div className='user-statusbar-div'>
            <UserStstusbar userName = {userName}/>
        </div>
        <div>
            <div className='addtaskdiv'>
                <AddTask tasks = {tasks} setTasks = {setTasks}/>
            </div>
            <div className='viewtaskdiv'>
              <ViewTasks tasks = {tasks} setTasks = {setTasks}/>
            </div>
        </div>
    </div>
  ) : <></>
}

export default UserPage