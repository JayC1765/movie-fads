import React, { useEffect, useState } from 'react';
import apiKey from '../constants/private';

function Poster(props) {
  let [BaseImageURL, setBaseImageURL] = useState('');
  let [PosterPath, setPosterPath] = useState('');
  let [OriginalTitle, setOriginalTitle] = useState(null);
  let [setConfigData] = useState('');
  let [BaseURL] = useState('https://api.themoviedb.org/3/');
  let [PosterSize] = useState('w92');

  //! Will want to move this function into an action and mapDispatchToProps
  //! Instead of define within useEffect itself
  useEffect(() => {
    let configUrl = ''.concat(
      BaseURL,
      'configuration?api_key=',
      apiKey,
    );
    fetch(configUrl)
      .then((result) => result.json())
      .then((data) => {
        setBaseImageURL(data.images.secure_base_url);
        setConfigData(data.images);
      });

    let url = ''.concat(
      BaseURL,
      'movie/',
      props.tmdbId,
      '?api_key=',
      privateVars.apiKey,
      '&langauge=en-US'
    );
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setPosterPath(data.poster_path);
        setOriginalTitle(data.original_title);
        // console.log(data);
      });
  }, []);

  return (
    <div className="pic-title">
      <img
        className="movie-pic"
        src={BaseImageURL + PosterSize + PosterPath}
        alt={OriginalTitle}
      />
      <h3>{OriginalTitle}</h3>
    </div>
  );
}
export default Poster;
