import './TasksFilter.css';

function TasksFilter(props) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const { filter, onFilterChange } = props;
  const buttonss = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const classItem = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button className={classItem} type="button" onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttonss}</ul>;
}

export default TasksFilter;
