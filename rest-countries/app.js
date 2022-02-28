import API from './assets/scripts/API_CONFIG.js';
import { sortCountries, generateGrid, generateCountryCard } from './assets/scripts/utils.js';

const searchButton = document.getElementById('search-button');
const searchTerm = document.getElementById('search-term');
const countriesContainer = document.getElementById('container');
const spinner = document.getElementById('spinner');
const errorMsg = document.getElementById('error-msg');
const sortBtns = document.querySelectorAll('[data-sort]');

const pageState = {
   loading: false,
   error: false,
   sortBy: '',
   descending: true,
   data: []
};

const fetchCountries = async (pageState, searchVal = '') => {
   if (sessionStorage.getItem('countries') && !searchVal) {
      pageState.data = JSON.parse(sessionStorage.getItem('countries'));
   } else {
      try {
         pageState.loading = true;
         pageState.error = false;
         errorMsg.classList.add('hidden');
         spinner.classList.remove('hidden');
         const data = searchTerm.value ? await API.searchCountries(searchVal) : await API.fetchCountries();
         if (!searchVal) {
            sessionStorage.setItem('countries', JSON.stringify(data));
         }
         pageState.data = data;
         pageState.loading = false;
         spinner.classList.add('hidden');
      } catch (e) {
         pageState.error = true;
         errorMsg.classList.remove('hidden');
      }
   }
};

(async () => {
   await fetchCountries(pageState);
   generateGrid(countriesContainer, pageState.data);
})();

searchButton.addEventListener('click', async function(){
   countriesContainer.innerHTML = '';
   await fetchCountries(pageState, searchTerm.value);
   if (!pageState.data.length) {
      countriesContainer.innerHTML = `<h2>No results found for '${searchTerm.value}'</h2>`;
      return;
   }
   pageState.data.forEach((country) => {
      const card = generateCountryCard(country);
      countriesContainer.appendChild(card);
   });

   searchTerm.value = '';
});

sortBtns.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      if (e.target.value === pageState.sortBy) {
         pageState.descending = !pageState.descending;
      }
      pageState.sortBy = e.target.value;
      const sortedArr = sortCountries(pageState, pageState.sortBy, pageState.descending);
      generateGrid(countriesContainer, sortedArr);
   });
});
