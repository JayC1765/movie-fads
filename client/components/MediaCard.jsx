import React from 'react';
import Poster from './Poster';
import Buttons from './Buttons';

function MediaCard(props) {
  return (
    <div className="media-card">
      <div
        className="poster"
        onClick={() =>
          window.open(`https://www.themoviedb.org/movie/${props.tmdbId}`)
        }
        className="mediaCard"
      >
        <Poster key={`poster ${props.key}`} tmdbId={props.tmdbId} />
      </div>
      <div className="buttons">
        <Buttons />
      </div>
    </div>
  );
};

export default MediaCard;
