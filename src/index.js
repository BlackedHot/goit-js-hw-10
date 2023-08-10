import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const delay = 2000;

breedSelect.style.display = 'none';

window.addEventListener('load', () => {
  setTimeout(() => {
    breedSelect.style.display = 'block';
    loader.style.display = 'none';
    error.style.display = 'none';
  }, delay);
});

fetchBreeds()
  .then(data => {
    const option = data
      .map(({ id, name }) => `<option value="${id}">${name}</option>`)
      .join('');
    breedSelect.insertAdjacentHTML('beforeend', option);

    new SlimSelect({
      select: breedSelect,
    });
  })
  .catch(() => {
    loader.style.display = 'none';
    error.style.display = 'block';
  });

breedSelect.addEventListener('change', evt => {
  evt.preventDefault();

  loader.style.display = 'block';
  error.style.display = 'none';

  Notiflix.Loading.standard('Meowloading... Please meowait...');

  const breedSelectId = breedSelect.value;

  fetchCatByBreed(breedSelectId)
    .then(cat => {
      loader.style.display = 'none';
      Notiflix.Loading.remove();

      const markup = `
        <div class="container" style="display: flex;">
          <div class="cat-picture">
            <img src="${cat.url}" alt="${cat.id}" width="400" />
          </div>
          <div class="info" style="margin-left: 10px; margin-top: -24px; width: 400px;">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <p><b>Temperament:</b> ${cat.breeds[0].temperament}</p>
          </div>
        </div>`;
      catInfo.innerHTML = markup;
      error.style.display = 'none';
    })
    .catch(() => {
      loader.style.display = 'none';
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        'There is no any meowinfo about cat',
        'Please choose another meow-breed'
      );
      catInfo.innerHTML = '';
      error.style.display = 'block';
    });
});
