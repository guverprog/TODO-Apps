import { Component } from 'react';
import './NewTaskForm.css';
import Proptypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    onItemAdded: Proptypes.func.isRequired,
  };

  onLableChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onTimeChange = (e) => {
    const { value, name } = e.target;
    if (+value < 60) {
      if (name === 'min') {
        this.setState({ min: value.replace(/[^\d;]/g, '') });
      }
      if (name === 'sec') {
        this.setState({ sec: value.replace(/[^\d;]/g, '') });
      }
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { label, min, sec } = this.state;
    const { onItemAdded } = this.props;
    if (label.length !== 0) onItemAdded(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form onSubmit={this.onSubmit} className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLableChange}
          value={label}
          maxLength="14"
        />
        <input className="new-todo-form__timer" placeholder="Min" onChange={this.onTimeChange} value={min} name="min" />
        <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onTimeChange} value={sec} name="sec" />
        <button type="submit"> </button>
      </form>
    );
  }
}
