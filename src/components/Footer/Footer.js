import './Footer.css'
import Proptypes from 'prop-types'
import TaskFilter from '../TasksFilter'

function Footer({todo, filter, onFilterChange, onClearCompleted}){
  return (
    <footer className="footer">
      <span className="todo-count">
        {todo}
        {' '}
        items left
      </span>
      <TaskFilter
        filter={filter}
        onFilterChange={onFilterChange}
      />
      <button type='button'
        className="clear-completed"
        onClick={() => onClearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  todo: 0,
  onFilterChange: () => {},
  onClearCompleted: () => {},
}
Footer.propTypes = {
  todo: Proptypes.number,
  filter: Proptypes.string.isRequired,
  onFilterChange: Proptypes.func,
  onClearCompleted: Proptypes.func,
}
export default Footer