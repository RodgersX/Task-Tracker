import { useState, useEffect } from 'react' // react hooks for state
import {BrowserRouter as Router, Route} from 'react-router-dom'

import classes from './App.module.css'
import AddTask from './components/AddTask'
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async id => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // delete task
  const deleteTask = async id => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async id => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map(task => task.id === id 
      ? {...task, reminder: data.reminder} : task))
  }

  //Add task
  const addTask = async task => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  return (
    <Router>
      <div className={classes.container}>
        <Header
        showAdd={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)} />
        {/* short way of doing ternary without else statement */}
        
        <Route path='/' exact render={props => (
          <>
          { showAddTask && <AddTask onAdd={addTask} />}
          { tasks.length > 0 ? 
            <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder} />
            : ('No Tasks to Show!')
          }
          </>
        )} />
        <Route
        path="/about"
        component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
