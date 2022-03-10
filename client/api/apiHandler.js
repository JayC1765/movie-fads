import apiKey from '../constants/private';

const BASE_URL = 'http://api.themoviedb.org/3/';

const apiHandler = {};

apiHandler.configureApi = () => (
  new Promise((resolve, reject) => {
    const configUrl = `${BASE_URL}configuration?api_key=${encodeURIComponent(apiKey)}`;
    if (!localStorage.getItem(apiKey)) {
      fetch(configUrl)
        .then((data) => data.json())
        .then((configData) => {
          localStorage.setItem(apiKey, JSON.stringify(configData));
          resolve(configData);
        })
        .catch((e) => reject(e));
    } else {
      resolve(JSON.parse(localStorage.getItem(apiKey)));
    }
  })
);

apiHandler.searchApi = (query) => (
  new Promise((resolve, reject) => {
    const searchUrl = `${BASE_URL}search/movie?api_key=${encodeURIComponent(apiKey)}&language=en-US&query=${encodeURIComponent(query)}&include_adult=false`;
    fetch(searchUrl)
      .then((data) => data.json())
      .then((movieList) => resolve(movieList))
      .catch((e) => reject(e));
  })
);

apiHandler.locatePoster = (filmId, configObj) => {
  console.log(filmId);
  return new Promise((resolve, reject) => {
    const imageBase = configObj.images.base_url;
    const size = configObj.images.poster_sizes[0];
    if (!localStorage.getItem(filmId)) {
      fetch(`${BASE_URL}movie/${encodeURIComponent(filmId)}?api_key=${encodeURIComponent(apiKey)}&language=en-US`)
        .then((data) => data.json())
        .then((movie) => {
          if (movie.poster_path) {
            localStorage.setItem(filmId, JSON.stringify(movie));
            resolve({
              poster_path: `${imageBase}${size}/${movie.poster_path}`,
              original_title: movie.original_title,
            });
          } else {
            reject(new Error('Poster URL not found'));
          }
        })
        .catch((e) => reject(e));
    } else {
      resolve({
        poster_path: `${imageBase}${size}/${JSON.parse(localStorage.getItem(filmId)).poster_path}`,
        original_title: JSON.parse(localStorage.getItem(filmId)).original_title,
      });
    }
  })
};

export default apiHandler;
