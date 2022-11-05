import { Component } from 'react'
import './Task.css'
import Proptypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class Task extends Component {
  state = {
    text: '',
    visible: false,
  }

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { text } = this.state
    const { onEditTask } = this.props
    e.preventDefault()
    if (text) {
      onEditTask(text)
      this.setState({
        text: '',
        visible: false,
      })
    }
  }

  editTask = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }))
  }

  render() {
    const { text, visible } = this.state
    const {
      label, timeCreated, onDeleted, onToggleDone, done,
    } = this.props
    const classNames = done ? 'completed' : ''
    const clazz = visible ? 'visible' : 'hidden'
    return (
      <li className={classNames}>
        <form className={clazz} onSubmit={this.onSubmit}>
          <input
            type="Text"
            className="new-todo"
            placeholder="Type to Edit Task"
            onChange={this.onLabelChange}
            value={text}
          />
        </form>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={done} />
          <label onClick={onToggleDone} role="presentation" htmlFor="{label}" aria-label="Task">
            <span className="description">{label}</span>
            <span className="created">{formatDistanceToNow(timeCreated, { addSuffix: true, includeSeconds: true })}</span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Edit button" onClick={this.editTask} />
          <button className="icon icon-destroy" type="button" aria-label="Destroy button" onClick={onDeleted} />
        </div>
      </li>
    )
  }
}
Task.defaultProps = {
  label: 'write the name of the task',
  timeCreated: new Date(),
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
}
Task.propTypes = {
  label: Proptypes.string,
  timeCreated: Proptypes.object,
  done: Proptypes.bool,
  onDeleted: Proptypes.func,
  onToggleDone: Proptypes.func,
}
