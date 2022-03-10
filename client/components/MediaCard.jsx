import React from 'react';
import Poster from './Poster';
import Buttons from './Buttons';

function MediaCard(props) {
  return (
    <div className="media-card">
      <div
        className="poster"
        onClick={() =>
          window.open(`https://www.themoviedb.org/movie/${props.tmdbId}`)}
      >
        <Poster posterPath={props.posterPath} originalTitle={props.originalTitle} key={`poster ${props.key}`} tmdbId={props.tmdbId} />
      </div>
      <div className="buttons">
        <Buttons fav={props.fav} toWatch={props.toWatch} haveSeen={props.haveSeen} key={`buttons${props.key}`} tmdbId={props.tmdbId} />
      </div>
    </div>
  );
}

export default MediaCard;
