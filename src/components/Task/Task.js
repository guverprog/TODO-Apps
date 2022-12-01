import { useEffect, useState } from 'react';
import './Task.css';
import Proptypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import format from 'date-fns/format';

function Task({ min, sec, onEditTask, label, timeCreated, onDeleted, onToggleDone, done }) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timeValue, setTimeValue] = useState(min * 60 + +sec);
  const [idTimer, setIdTimer] = useState(null);
  useEffect(() => {
    if (timeValue <= 0) {
      setTimeValue(0);
      setIsActive(false);
    }
  }, [timeValue]);

  const onLabelChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text) {
      onEditTask(text);
      setText('');
      setVisible(false);
    }
  };

  const editTask = () => {
    setVisible((prevState) => !prevState);
  };

  const onPlayTimer = () => {
    const timer = setInterval(() => {
      setTimeValue((prevState) => {
        const count = prevState - 1;
        return count;
      });
    }, 1000);
    setIsActive(true);
    setIdTimer(timer);
  };

  function onStopTimer() {
    clearInterval(idTimer);
    setIsActive(false);
  }

  const timer = format(timeValue * 1000, 'mm:ss');
  const classNames = done ? 'completed' : '';
  const clazz = visible ? 'visible' : 'hidden';
  const buttonTimer = isActive ? (
    <button type="button" aria-label="Pause button" className="icon icon-pause" onClick={onStopTimer} />
  ) : (
    <button type="button" aria-label="Play button" className="icon icon-play" onClick={onPlayTimer} />
  );
  return (
    <li className={classNames}>
      <form className={clazz} onSubmit={onSubmit}>
        <input type="Text" className="new-todo" placeholder="Type to Edit Task" onChange={onLabelChange} value={text} />
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
          <span className="created">{formatDistanceToNow(timeCreated, { addSuffix: true, includeSeconds: true })}</span>
        </label>
        <button className="icon icon-edit" type="button" aria-label="Edit button" onClick={editTask} />
        <button className="icon icon-destroy" type="button" aria-label="Destroy button" onClick={onDeleted} />
      </div>
    </li>
  );
}
export default Task;
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
