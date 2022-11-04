import { Component } from 'react'
import './NewTaskForm.css'
import Proptypes from 'prop-types'
export default class NewTaskForm  extends Component{
    state={
        label:''
    }
    onLableChange=(event)=>{
        this.setState({
            label:event.target.value
        })
    }
    onSubmit=(event)=>{
        event.preventDefault()
        this.props.onItemAdded(this.state.label)
        this.setState({
            label:''
        })
    }
    static propTypes = {
        onItemAdded: Proptypes.func.isRequired
      };
    render(){
        return (
        <form
        onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus
        onChange={this.onLableChange}
        value={this.state.label}/>
        </form>
    )
    }
}