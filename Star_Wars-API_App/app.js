import { validateNextCall, display, hide } from './assets/scripts/utils.js';
import { fetchDataAsync } from './assets/scripts/fetchData.js';
import { generateTableData, generateTableHeader } from './assets/scripts/generateData.js';

const loaders = document.querySelectorAll('[data-fetch-api]');
const loadNext = document.querySelector('[data-load-next]');
const loadPrev = document.querySelector('[data-load-prev]');

const caption = document.querySelector('#caption');
const table = document.querySelector('#table');
const tableData = document.querySelector('#table-data');
const tableHeader = document.querySelector('#table-header');

const backBtns = document.querySelectorAll('[data-back]');
const btns = document.querySelector('#btns');

const container = document.querySelector('.container');
const error = document.querySelector('#error-msg');

let currentCall = '';

const API_OPTIONS = {
   characters: {
      headers: [ 'name', 'height', 'mass', 'eye_color', 'gender', 'skin_color' ],
      url: 'https://swapi.dev/api/people/?page=',
      index: 1
   },
   ships: {
      headers: [ 'name', 'model', 'manufacturer', 'passengers' ],
      url: 'https://swapi.dev/api/starships/?page=',
      index: 1
   },
   planets: {
      headers: [ 'name', 'gravity', 'terrain', 'climate' ],
      url: 'https://swapi.dev/api/planets/?page=',
      index: 1
   },
   species: {
      headers: [ 'name', 'classification', 'language', 'skin_colors', 'eye_colors' ],
      url: 'https://swapi.dev/api/species/?page=',
      index: 1
   },
   vehicles: {
      headers: [ 'name', 'model', 'manufacturer', 'passengers' ],
      url: 'https://swapi.dev/api/vehicles/?page=',
      index: 1
   }
};

const throwError = (errorElement, msg) => {
   display(container, errorElement);
   hide(table);
   errorElement.innerText = msg;
   setTimeout(() => {
      hide(errorElement);
      errorElement.innerText = '';
   }, 5000);
};

const handleRequest = async (e) => {
   currentCall = e.target.value;
   caption.innerText = e.target.value;
   try {
      const { headers, url, index } = API_OPTIONS[currentCall];
      const data = await fetchDataAsync(url, index);
      const { next, previous, results } = data;
      display(table, btns);
      hide(container, error);
      generateTableHeader(tableHeader, headers);
      generateTableData(tableData, results, headers);
      validateNextCall(loadNext, next);
      validateNextCall(loadPrev, previous);
   } catch (e) {
      throwError(error, 'Bad request or service down , try again later');
   }
};

const handleNextRequest = async () => {
   try {
      API_OPTIONS[currentCall] = {
         ...API_OPTIONS[currentCall],
         index: API_OPTIONS[currentCall].index + 1
      };
      let { headers, url, index } = API_OPTIONS[currentCall];
      const data = await fetchDataAsync(url, index);
      const { next, previous, results } = data;
      generateTableData(tableData, results, headers);
      validateNextCall(loadNext, next);
      validateNextCall(loadPrev, previous);
   } catch (e) {
      throwError(error, 'Bad request or service down , try again later');
   }
};

const handlePreviousRequest = async () => {
   try {
      API_OPTIONS[currentCall] = {
         ...API_OPTIONS[currentCall],
         index: API_OPTIONS[currentCall].index - 1
      };
      let { headers, url, index } = API_OPTIONS[currentCall];
      const data = await fetchDataAsync(url, index);
      const { next, previous, results } = data;
      generateTableData(tableData, results, headers);
      validateNextCall(loadNext, next);
      validateNextCall(loadPrev, previous);
   } catch (e) {
      throwError(error, 'Bad request or service down , try again later');
   }
};

loaders.forEach((loader) => {
   loader.addEventListener('click', handleRequest);
});

loadNext.addEventListener('click', handleNextRequest);
loadPrev.addEventListener('click', handlePreviousRequest);

backBtns.forEach((btn) => {
   btn.addEventListener('click', () => {
      currentCall = '';
      display(container);
      hide(table, btns);
   });
});
