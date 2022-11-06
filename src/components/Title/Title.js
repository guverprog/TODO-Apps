import './Title.css';

import Proptypes from 'prop-types';

function Title({ title }) {
  return <h1>{title}</h1>;
}
Title.defaultProps = {
  title: 'todos',
};
Title.propTypes = {
  title: Proptypes.string,
};
export default Title;
