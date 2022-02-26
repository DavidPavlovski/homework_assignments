import API from './assets/scripts/API_CONFIG.js';

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

const fetchCountries = async (searchVal = '') => {
   try {
      pageState.loading = true;
      pageState.error = false;
      errorMsg.classList.add('hidden');
      spinner.classList.remove('hidden');
      const data = searchTerm.value ? await API.searchCountries(searchVal) : await API.fetchCountries();
      pageState.data = data;
      pageState.loading = false;
      spinner.classList.add('hidden');
   } catch (e) {
      pageState.error = true;
      errorMsg.classList.remove('hidden');
   }
};

const generateCountryCard = (country) => {
   const card = document.createElement('div');
   card.classList.add('card');
   card.innerHTML = `
    <img src=${country.flags.svg} alt=flag of ${country.name.official}>
    <h2>Name: ${country.name.official}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population} </p>
    <p>Area: ${country.area} km<sup>2</sup></p>
  `;
   return card;
};

(async () => {
   await fetchCountries();
   pageState.data.forEach((country) => {
      const card = generateCountryCard(country);
      countriesContainer.appendChild(card);
   });
})();

searchButton.addEventListener('click', async function(){
   countriesContainer.innerHTML = '';
   await fetchCountries(searchTerm.value);
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
const sortCountries = (sortBy, descending) => {
   let sorted;
   console.log(descending);
   if (sortBy === 'name') {
      sorted = pageState.data.sort((a, b) => {
         if (descending) {
            return String(a.name.official).localeCompare(b.name.official);
         }
         return String(b.name.official).localeCompare(a.name.official);
      });
   } else if (sortBy === 'capital') {
      sorted = pageState.data.sort((a, b) => {
         if (descending) {
            return String(a.capital).localeCompare(b.capital);
         }
         return String(b.capital).localeCompare(a.capital);
      });
   } else {
      sorted = pageState.data.sort((a, b) => {
         return descending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      });
   }
   countriesContainer.innerHTML = '';
   sorted.forEach((country) => {
      const card = generateCountryCard(country);
      countriesContainer.appendChild(card);
   });
};

sortBtns.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      if (e.target.value === pageState.sortBy) {
         pageState.descending = !pageState.descending;
      }
      pageState.sortBy = e.target.value;
      sortCountries(pageState.sortBy, pageState.descending);
   });
});
