import { Component } from 'react';
import Title from '../Title';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
  maxId = 1;

  state = {
    todoData: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onEditTask = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: text };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.done);
      return {
        todoData: newArray,
      };
    });
  };

  filter = () => {
    const { filter, todoData } = this.state;
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

  createTodoItem(label) {
    return {
      label,
      timeCreated: new Date(),
      done: false,
      id: this.maxId++,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleItems = this.filter();
    const todoCount = todoData.filter((item) => !item.done).length;
    return (
      <section className="todoapp">
        <header className="header">
          <Title />
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditTask={this.onEditTask}
          />
          <Footer
            todo={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    );
  }
}
