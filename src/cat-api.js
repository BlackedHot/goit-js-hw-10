import Notiflix from 'notiflix';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8OW88WB5G3hH48OYYFlKxWW0JVfNDWxe4nYpbfuvEEWj1tPNEaFeOKfZbj6H6Z7L';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return axios
    .get('breeds/')
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(() => {
      Notiflix.Report.failure('Error. Something moew wrrrrong');
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data[0];
    })
    .catch(() => {
      Notiflix.Report.failure('Error. Something moew wrrrrong');
    });
}

export { fetchBreeds, fetchCatByBreed };
