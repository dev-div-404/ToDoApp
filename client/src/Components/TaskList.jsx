import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import server_url from './../helper'

const TaskList = (props) => {
    const tasks = props.tasks

    axios.defaults.withCredentials = true;

    const donetasks = tasks.filter((task) => task.status === true)
    const notdonetasks = tasks.filter((task) => task.status !== true)

    const navigate = useNavigate()

    const deleteTaskHandler = async(taskid) =>{
        // console.log(taskid)
        await axios.post(`${server_url}/deletetask`,{taskid : taskid}).then(res =>{
        if(res.status === 200){
            window.location.reload()
        }else if(res.status === 201){
          alert(res.data.message)
            navigate('/login')
        }
      }).catch(err =>{
        console.error(err);
      })
    }

    const doneTaskHandler = async(taskid) =>{
        await axios.post(`${server_url}/donetask`,{taskid : taskid}).then(res =>{
        if(res.status === 200){
            window.location.reload()
        }else if(res.status === 201){
          alert(res.data.message)
            navigate('/login')
        }
      }).catch(err =>{
        console.error(err);
      })
    }
  return (
    <div>
        {
            notdonetasks.map((task,index) => (
                <div key={task._id} className='indivisual-div' style={ new Date().setHours(0, 0, 0, 0) > new Date(task.date).setHours(0, 0, 0, 0) ? {backgroundColor : 'red'} :{backgroundColor : 'rgb(128, 128, 0)'}}>
                    <div className='task-indivisual-property task-description'>
                        <h3>{ task.description }</h3>
                    </div>
                    <div className='task-indivisual-property task-date'>
                        <h3>{ task.date }</h3>
                    </div>
                    <div className='task-indivisual-property task-status'>
                        <h3>{ task.status ? 'done' : 'notdone'}</h3>
                    </div>
                    <div className='task-indivisual-property task-action'>
                        <button className='task-action-btn delete-task-btn' onClick={() => deleteTaskHandler(task._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        {
                            !task.status ? <button className='task-action-btn done-task-btn' onClick={() => doneTaskHandler(task._id)}>done</button>
                            : <div></div>
                        }
                    </div>
                </div>
            ))
            }{

            donetasks.map((task,index) => (
                <div key={task._id} className='indivisual-div' style={{backgroundColor : 'rgb(0, 51, 0)'}}>
                    <div className='task-indivisual-property task-description'>
                        <h3>{ task.description }</h3>
                    </div>
                    <div className='task-indivisual-property task-date'>
                        <h3>{ task.date }</h3>
                    </div>
                    <div className='task-indivisual-property task-status'>
                        <h3>{ task.status ? 'done' : 'notdone'}</h3>
                    </div>
                    <div className='task-indivisual-property task-action'>
                        <button className='task-action-btn delete-task-btn' onClick={() => deleteTaskHandler(task._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        {
                            !task.status ? <button className='task-action-btn done-task-btn' onClick={() => doneTaskHandler(task._id)}>done</button>
                            : <div></div>
                        }
                    </div>
                </div>
            ))
            
        }
    </div>
  )
}

export default TaskList