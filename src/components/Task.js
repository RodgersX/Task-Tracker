import { FaTimes } from 'react-icons/fa'

import classes from '../App.module.css'

const Task = ({ task, onDelete, onToggle }) => {
    return (
        <div
        className={`${classes.task} ${task.reminder ? classes.reminder : ''}`}
        onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text}{' '}
                <FaTimes
                onClick={() => onDelete(task.id)}
                style={{color: 'red', cursor: 'pointer'}} /> 
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task