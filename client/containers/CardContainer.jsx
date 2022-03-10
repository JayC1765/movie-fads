import React from 'react';
import MediaCard from '../components/MediaCard';

function CardContainer(props) {
  const movies = [];
  for (let i = 0; i < props.movieList.length; i += 1) {
    movies.push(
      <MediaCard key={`movieList${i}`} tmdbId={props.movieList[i].TMDBid} posterPath={props.movieList[i].poster_path} originalTitle={props.movieList[i].original_title} />,
    );
  }
  return <div className="card-container">{movies}</div>;
}

export default CardContainer;
