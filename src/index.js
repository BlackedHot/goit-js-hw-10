import { fetchBreeds } from "./js/cat-api";
import { fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
const selectOptionsElement = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const errorElem = document.querySelector('.error');



// selectOptionsElement.classList.add('is-hidden');

// loaderElem.classList.toggle('is-hidden');
// errorElem.classList.toggle('is-hidden');

fetchBreeds()
  .then(data => { 
    selectRendering(data);
    new SlimSelect({
     select: selectOptionsElement
    });
  })
  .catch(error => console.log(error)
  );


function selectRendering(elements) {
  const markup = elements.map((element) => {
    return `<option value="${element.id}">${element.name}</option>`;
  })
    .join("");
  selectOptionsElement.innerHTML = markup;
};


selectOptionsElement.addEventListener('change', fetchCatByBreed);


