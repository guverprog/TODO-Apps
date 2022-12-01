import React, { useState } from 'react';
import './NewTaskForm.css';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLableChange = (event) => {
    setLabel(event.target.value);
  };

  const onTimeChange = (e) => {
    const { value, name } = e.target;
    if (+value < 60) {
      if (name === 'min') {
        setMin(value.replace(/[^\d;]/g, ''));
      }
      if (name === 'sec') {
        setSec(value.replace(/[^\d;]/g, ''));
      }
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (label.length !== 0) onItemAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form onSubmit={onSubmit} className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLableChange}
        value={label}
        maxLength="14"
      />
      <input className="new-todo-form__timer" placeholder="Min" onChange={onTimeChange} value={min} name="min" />
      <input className="new-todo-form__timer" placeholder="Sec" onChange={onTimeChange} value={sec} name="sec" />
      <button type="submit"> </button>
    </form>
  );
}

export default React.memo(NewTaskForm);
