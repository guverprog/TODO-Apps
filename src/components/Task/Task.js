import './Task.css'
const Task=({label,timeCreated})=>{
    return (
            <span>
            <div className="view">
              <input className="toggle" type="checkbox"/>
              <label>
              <span className="description">{label}</span>
                <span className="created">{timeCreated}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
            </span>
    )
}
export default Task