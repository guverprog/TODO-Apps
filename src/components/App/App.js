import Title from '../Title'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './App.css'
const todoData=[
  { label:"Completed task" ,timeCreated:"created 17 seconds ago",id:1,status:false},
  { label:"Editing task", timeCreated:"created 5 minutes ago",id:2,status:true},
  {label:"Active task" ,timeCreated:"created 5 minutes ago",id:3,status:true}
]
const App=()=>{
    return (
        <section className="todoapp">
          <header className="header">
            <Title title="todos"/>
            <NewTaskForm />
          </header>
          <section className="main">
            <TaskList todos={todoData}/>
            <Footer/>
          </section>
        </section>
    )
}
export default App