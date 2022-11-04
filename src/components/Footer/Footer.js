import './Footer.css'
import TaskFilter from '../TasksFilter'
import { Component } from 'react'
import Proptypes from 'prop-types'
export default class Footer extends Component{
  render(){
   const {todo,filter,onFilterChange,onClearCompleted}= this.props
    return (
      <footer className="footer">
      <span className="todo-count">{todo} items left</span>
     <TaskFilter filter={filter}
     onFilterChange={onFilterChange}/>
      <button className="clear-completed"
      onClick={()=>onClearCompleted()}>Clear completed</button>
    </footer>
  )
  }
}
Footer.defaultProps={
  todo:0,
  filter:'all',
  onFilterChange:()=>{},
  onClearCompleted:()=>{}
}
Footer.propTypes={
 todo:Proptypes.number,
 filter:Proptypes.string.isRequired,
 onFilterChange: Proptypes.func,
 onClearCompleted: Proptypes.func
}