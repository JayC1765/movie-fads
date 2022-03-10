import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFav, toggleToWatch, toggleHaveSeen } from '../actions/actions';
//! Buttons need on click functions
//! Functions will dispatch actoins, through mapDispatchToProps

function Buttons(props) {
  const { toWatch, fav, haveSeen } = props;
  const buttons = [];
  const { currentUserID, userMovieArray } = useSelector((state) => state.lists);
  const dispatch = useDispatch();
  const button1 = toWatch ? 'Remove watchlist' : 'Add watchlist';
  const button2 = fav ? 'Remove favorite' : 'Add favorite';
  const button3 = haveSeen ? 'Remove watched' : 'Add watched';
  if (button1) {
    buttons.push(
      <button
        type="button"
        onClick={() => {
          console.log(userMovieArray);
          console.log(props.tmdbId);
          fetch('/updateMedia', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'David', TMDBid: `${props.tmdbId}`, status: 'toWatch' }),
          })
            .then(() => dispatch(toggleToWatch(props.tmdbId)))
            .catch((e) => console.error(e));
        }}
      >
        {button1}
      </button>,
    );
  }
  if (button2) {
    buttons.push(
      <button
        type="button"
        onClick={() => {
          console.log(userMovieArray);
          console.log(props.tmdbId);
          fetch('/updateMedia', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'David', TMDBid: `${props.tmdbId}`, status: 'fav' }),
          })
            .then(() => dispatch(toggleFav(props.tmdbId)))
            .catch((e) => console.error(e));
        }}
      >
        {button2}
      </button>,
    );
  }
  if (button3) {
    buttons.push(
      <button
        type="button"
        onClick={() => {
          console.log(userMovieArray);
          console.log(props.tmdbId);
          fetch('/updateMedia', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'David', TMDBid: `${props.tmdbId}`, status: 'haveSeen' }),
          })
            .then(() => dispatch(toggleHaveSeen(props.tmdbId)))
            .catch((e) => console.error(e));
        }}
      >
        {button3}
      </button>,
    );
  }
  return <div className="buttons">{buttons}</div>;
}

export default Buttons;
