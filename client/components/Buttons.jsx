import React from 'react';
import PropTypes from 'prop-types';
//! Buttons need on click functions
//! Functions will dispatch actoins, through mapDispatchToProps
function Buttons(props) {
  const { button1, button2, button3 } = props;
  const buttons = [];
  if (button1) {
    buttons.push(
      <button type="button" onClick={() => console.log('clicked button 1')}>
        {props.button1}
      </button>
    );
  }
  if (button2) {
    buttons.push(
      <button type="button" onClick={() => console.log('clicked button 2')}>
        {' '}
        {button2}
      </button>,
    );
  }
  if (button3) {
    buttons.push(
      <button type="button" onClick={() => console.log('clicked button 3')}>
        {' '}
        {button3}
      </button>,
    );
  }
  return <div className="buttons">{buttons}</div>;
}

Buttons.propTypes = {
  button1: PropTypes.string,
  button2: PropTypes.string,
  button3: PropTypes.string,
};

Buttons.defaultProps = {
  button1: 'Add to Watchlist',
  button2: 'Add to Favorites',
  button3: 'Mark as Watched',
};

export default Buttons;
