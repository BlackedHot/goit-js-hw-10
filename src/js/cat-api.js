import Notiflix from 'notiflix';
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_4agEjA5ST4BR9dulRTIVW0nn4i5p8lzRbXBEu7TsSn87x4FkIRFvfUcLC7nVs8g6";
const BASEURL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_4agEjA5ST4BR9dulRTIVW0nn4i5p8lzRbXBEu7TsSn87x4FkIRFvfUcLC7nVs8g6';
const catInfoEl = document.querySelector('.cat-info');

const selectOptionsElement = document.querySelector('.breed-select');
const loaderElem = document.querySelector('.loader');
const errorElem = document.querySelector('.error');
// loaderElem.textContent = "";
export function fetchBreeds() {
  return fetch(`${BASEURL}/breeds?api_key=${API_KEY}`)
    .then(resp => {
      
    console.log(resp);
    if (!resp.ok) {
      throw new Error(resp.statusText)
      }
    return resp.json()
  })
      
  // const isRecipientAvailable = Math.random() > 0.5;    

  //   if (isRecipientAvailable) {
  //     throw new Error(resp.statusText)
  //     }
  //   return resp.json()
  // })
      
      
};


export function fetchCatByBreed(event) {
  loaderElem.classList.remove('is-hidden');
  const breedId = event.currentTarget.value;
  //https://api.thecatapi.com/v1/images/search?breed_ids=abys&api_key=live_4agEjA5ST4BR9dulRTIVW0nn4i5p8lzRbXBEu7TsSn87x4FkIRFvfUcLC7nVs8g6

  fetch(`${BASEURL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
    .then(resp => {

      
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }
      
      return resp.json()



    })
    .then(catData => {
      catInfoEl.innerHTML = catInfoRendering(catData[0]);
      loaderElem.classList.add('is-hidden');

    })
    .catch(error => {
      catInfoEl.innerHTML = "";
      Notiflix.Report.failure('ERROR!', 'Oops! Something went wrong! Try reloading the page!', 'Close');
      selectOptionsElement.classList.add('is-hidden');
      loaderElem.classList.toggle('is-hidden');
     

    });
};

function catInfoRendering(catArr) {
  const { url } = catArr;
  const { name, description, temperament } = catArr.breeds[0];
  const catDisplay = ` <img src="${url}" alt="${name}" width=500 />
      <div class="cat-text-wrap"><h2>${name}</h2>
      <p>${description}</p>
      <p><span class="temperament">Temperament:</span> ${temperament}</p> </div>`;
  
  return catDisplay;
};



