const loader = document.getElementById('loading-spinner');
const pages = document.getElementById('pages');

import API from './assets/scripts/api_config.js';
import navigation from './assets/scripts/helpers/navigation.js';
import { getMinMaxAverage } from './assets/scripts/helpers/utils.js';

navigation.initialize();

let pageState = {
   cityName: '',
   error: false,
   loading: false,
   data: [],
   statistics: {}
};

async function fetchData(cityName){
   pageState.loading = true;
   if (pageState.loading) {
      loader.classList.remove('hidden');
      pages.classList.add('hidden');
   }
   const data = await API.fetchCityForecast(cityName);
   pageState.loading = false;
   if (!pageState.loading) {
      loader.classList.add('hidden');
      pages.classList.remove('hidden');
   }
   return data;
}

navigation.submitForm(async () => {
   if (sessionStorage.getItem(navigation.searchField.value)) {
      pageState = JSON.parse(sessionStorage.getItem(navigation.searchField.value));
   } else {
      const data = await fetchData(navigation.searchField.value);
      if (data.cod !== '404') {
         const minMax = getMinMaxAverage(data.list);
         pageState.data = data;
         pageState.statistics = minMax;
         pageState.cityName = data.city.name;
         sessionStorage.setItem(navigation.searchField.value, JSON.stringify(pageState));
      } else {
         pageState.error = true;
      }
   }
   navigation.generateWeatherData(pageState);
   navigation.searchField.value = '';
});
