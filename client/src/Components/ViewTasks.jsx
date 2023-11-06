import React from 'react'
import TaskList from './TaskList'

const ViewTasks = (props) => {

    const tasklist = props.tasks
    const setTasks = props.setTasks

  return (
    <div className='view-div-container'>
        <div className='view-div-intro'>
            Your tasks
        </div>
        <div className='tasklist'>
            {tasklist.length === 0 ? (<div className='notaskdiv'>no tasks still now</div>) : <TaskList tasks = {tasklist} setTasks = {setTasks}/>}
        </div>
    </div>
  )
}

export default ViewTasks