/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import './Task.css';
import Proptypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

export default class Task extends Component {
  state = {
    text: '',
    visible: false,
    isActive: false,
    timeValue: +this.props.min * 60 + +this.props.sec,
    idTimer: null,
  };

  componentDidUpdate(_, prevState) {
    const { timeValue } = this.state;
    if (timeValue <= 0 && timeValue !== prevState.timeValue) {
      this.setState({ timeValue: 0 });
      this.onStopTimer();
    }
  }

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { text } = this.state;
    const { onEditTask } = this.props;
    e.preventDefault();
    if (text) {
      onEditTask(text);
      this.setState({
        text: '',
        visible: false,
      });
    }
  };

  editTask = () => {
    this.setState((prevState) => ({
      visible: !prevState.visible,
    }));
  };

  onPlayTimer = () => {
    const timer = setInterval(() => {
      this.setState(({ timeValue }) => {
        const count = timeValue - 1;
        return { timeValue: count };
      });
    }, 1000);
    this.setState({
      isActive: true,
      idTimer: timer,
    });
  };

  onStopTimer = () => {
    const { idTimer } = this.state;
    clearInterval(idTimer);
    this.setState({
      isActive: false,
    });
  };

  render() {
    const { text, visible, isActive, timeValue } = this.state;
    const { label, timeCreated, onDeleted, onToggleDone, done } = this.props;
    const timer = format(timeValue * 1000, 'mm:ss');
    const classNames = done ? 'completed' : '';
    const clazz = visible ? 'visible' : 'hidden';
    const buttonTimer = isActive ? (
      <button type="button" aria-label="Pause button" className="icon icon-pause" onClick={this.onStopTimer} />
    ) : (
      <button type="button" aria-label="Play button" className="icon icon-play" onClick={this.onPlayTimer} />
    );
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
          <label role="presentation" htmlFor="{label}" aria-label="Task">
            <button className="description" onClick={onToggleDone} type="button">
              {label}
            </button>
            <span className="description-time">
              {buttonTimer}
              {timer}
            </span>
            <span className="created">
              {formatDistanceToNow(timeCreated, { addSuffix: true, includeSeconds: true })}
            </span>
          </label>
          <button className="icon icon-edit" type="button" aria-label="Edit button" onClick={this.editTask} />
          <button className="icon icon-destroy" type="button" aria-label="Destroy button" onClick={onDeleted} />
        </div>
      </li>
    );
  }
}
Task.defaultProps = {
  label: 'write the name of the task',
  timeCreated: new Date(),
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
};
Task.propTypes = {
  label: Proptypes.string,
  timeCreated: Proptypes.object,
  done: Proptypes.bool,
  onDeleted: Proptypes.func,
  onToggleDone: Proptypes.func,
};
