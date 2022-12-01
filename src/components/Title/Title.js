import './Title.css';
import React from 'react';
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
export default React.memo(Title);
