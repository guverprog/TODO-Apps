import './TaskList.css'
import Task from '../Task/Task'
const TaskList =({todos})=>{
    const elements=todos.map((item)=>{
       
        const {id,status,...itemProps}=item
        const statusItem=  status? 'active' :'completed'
        return (
            <li className={statusItem} key={item.id}>
                <Task
                // label={item.label}
                // timeCreated={item.timeCreated}
                {...itemProps}/>
            </li>
        )
    })
    return (
        <ul className="todo-list">
       {elements}
        </ul>
    )
}
export default TaskList