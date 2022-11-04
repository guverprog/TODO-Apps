import {Component} from 'react'
import './TasksFilter.css'
export default class TasksFilter extends Component{
  buttons=[
    {name:'all',label:'All'},
    {name:'active',label:'Active'},
    {name:'completed',label:'Completed'}
  ]
  render(){
    const{filter,onFilterChange}=this.props
    const buttons=this.buttons.map(({name,label})=>{
      const isActive=filter===name
      const classItem = isActive ? 'selected' : ''
      return(
        <li key={name}>
        <button
        className={classItem}
        type="button"
        onClick={()=>onFilterChange(name)}>{label}</button>
      </li>
      )

    })
    return(
      <ul className="filters">
      {buttons}
    </ul>
  )
  }
}





