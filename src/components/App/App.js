import { useState } from 'react';

import Title from '../Title';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

let maxId = 1;
const createTodoItem = (label, min, sec) => ({
  label,
  timeCreated: new Date(),
  done: false,
  id: maxId++,
  min,
  sec,
});

function App() {
  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task', 5, 10),
    createTodoItem('Editing task', 5, 10),
    createTodoItem('Active task', 5, 10),
  ]);
  const [filter, setFilter] = useState('all');

  const deleteItem = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const newArray = [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
      return newArray;
    });
  };

  const addItem = (text, mins, secs) => {
    const newItem = createTodoItem(text, mins, secs);
    setTodoData((prevState) => {
      const newArray = [...prevState, newItem];
      return newArray;
    });
  };

  const onToggleDone = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const oldItem = prevState[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };
      const newArray = [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
      return newArray;
    });
  };

  const onEditTask = (id, text) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      const oldItem = prevState[idx];
      const newItem = { ...oldItem, label: text };
      const newArray = [...prevState.slice(0, idx), newItem, ...prevState.slice(idx + 1)];
      return newArray;
    });
  };

  const onFilterChange = (filterName) => {
    setFilter(filterName);
  };
  const onFilter = () => {
    switch (filter) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((item) => !item.done);
      case 'completed':
        return todoData.filter((item) => item.done);
      default:
        return todoData;
    }
  };

  const onClearCompleted = () => {
    setTodoData((prevState) => {
      const newArray = prevState.filter((item) => !item.done);
      return newArray;
    });
  };
  const visibleItems = onFilter();
  const todoCount = todoData.filter((item) => !item.done).length;
  return (
    <section className="todoapp">
      <header className="header">
        <Title />
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList todos={visibleItems} onDeleted={deleteItem} onToggleDone={onToggleDone} onEditTask={onEditTask} />
        <Footer todo={todoCount} filter={filter} onFilterChange={onFilterChange} onClearCompleted={onClearCompleted} />
      </section>
    </section>
  );
}
export default App;
