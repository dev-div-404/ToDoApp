import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import server_url from './../helper'

const AddTask = (props) => {
  
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()

  const [addTask, setAddTask] = useState({
    description : '',
    date : new Date().toISOString().split("T")[0],
  })

  const addTashChangeHandler = (event) =>{
    setAddTask({...addTask, [event.target.name] : event.target.value})
  }

  const addTaskClickHandler = () =>{
    
    axios.post(`${server_url}/addtask`,addTask).then(res =>{
        if(res.status === 200)
        {
          window.location.reload();
        }
        else if(res.status === 201){
          alert(res.data.message)
          navigate('/login')
        }
      }).catch(err =>{
        console.error(err);
      })

    setAddTask({
      description : '',
      date : new Date().toISOString().split("T")[0],
    })
  }


  return (
    <div className='addtaskformcontainer'>
        <div className='addtaskform'>
          <label className='addtasklabel'>Add New Tasks Here</label>
          <input type='text' placeholder='task description' value={addTask.description} id='taskdescription' name='description' onChange={addTashChangeHandler}></input>
          <input type='date' name='date' value={addTask.date} onChange={addTashChangeHandler}></input>
          <button id='addtaskbutton' onClick={addTaskClickHandler}>Add</button>
        </div>
    </div>
  )
}

export default AddTask