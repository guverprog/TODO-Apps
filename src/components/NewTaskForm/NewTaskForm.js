import { Component } from 'react';
import './NewTaskForm.css';
import Proptypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
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

  onSubmit = (event) => {
    event.preventDefault();
    const { label } = this.state;
    const { onItemAdded } = this.props;
    if (label.length !== 0) onItemAdded(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLableChange} value={label} />
      </form>
    );
  }
}
