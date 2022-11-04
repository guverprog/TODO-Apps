import { Component } from 'react'
import './Task.css'
import Proptypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
export default class Task extends Component{
  state={
    label:'',
    visible:false
  }
  onLabelChange=(e)=>{
    this.setState({
         label:e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label) {
      this.props.onEditTask(this.state.label)
      this.setState({
        label: '',
        visible: false,
      })
    }
  }
  editTask = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible
    }))
  }

 
  render(){
    const {label,timeCreated,onDeleted,onToggleDone,done}= this.props
    const classNames = done ? 'completed' : ''
    const clazz=this.state.visible? 'visible':'hidden'
    return (
      <li className={classNames}>
        <form className={clazz} onSubmit={this.onSubmit}>
          <input
            type="Text"
            className="new-todo"
            placeholder="Type to Edit Task"
            onChange={this.onLabelChange}
            value={this.state.label}
          />
        </form>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done}/>
        <label onClick={onToggleDone}>
        <span className="description">{label}</span>
          <span className="created">{formatDistanceToNow(timeCreated, { addSuffix: true, includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" onClick={this.editTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      </li>
)
  }
}
Task.defaultProps={
  label:'write the name of the task',
  timeCreated:new Date(),
  done:false,
  onDeleted:()=>{},
  onToggleDone:()=>{},
  editTask:()=>{}
}
Task.propTypes={
  label:Proptypes.string,
  timeCreated:Proptypes.object,
  done:Proptypes.bool,
  onDeleted:Proptypes.func,
  onToggleDone:Proptypes.func,
  editTask:Proptypes.func
}






