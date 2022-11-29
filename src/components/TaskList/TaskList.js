import './TaskList.css';
import Proptypes from 'prop-types';

import Task from '../Task/Task';

function TaskList({ todos, onDeleted, onToggleDone, onEditTask }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <Task
        // label={item.label}
        // timeCreated={item.timeCreated}
        key={id}
        {...itemProps}
        onDeleted={() => {
          onDeleted(id);
        }}
        onToggleDone={() => onToggleDone(id)}
        onEditTask={(text) => onEditTask(id, text)}
      />
    );
  });
  TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onEditTask: () => {},
  };
  TaskList.protoTypes = {
    todos: Proptypes.arrayOf(
      Proptypes.shape({
        label: Proptypes.string,
        id: Proptypes.number,
        done: Proptypes.bool,
        timeCreated: Proptypes.object,
        min: Proptypes.number,
        sec: Proptypes.number,
      })
    ).isRequired,
    onDeleted: Proptypes.func,
    onToggleDone: Proptypes.func,
    onEditTask: Proptypes.func,
  };
  return <ul className="todo-list">{elements}</ul>;
}
export default TaskList;
