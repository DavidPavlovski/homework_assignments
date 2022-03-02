const loader = document.getElementById('loading-spinner');
const pages = document.getElementById('pages');

import { getMinMaxAverage } from './utils.js';
import API from '../api_config.js';
import navigation from './navigation.js';

async function fetchData(pageState, cityName){
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

export async function fetchCityName(lat, long){
   const city = await API.fetchCityName(lat, long);
   return city[0];
}

export async function setPageState(pageState, cityName){
   if (sessionStorage.getItem(cityName)) {
      pageState = JSON.parse(sessionStorage.getItem(cityName));
   } else {
      const weatherData = await fetchData(pageState, cityName);
      if (weatherData.list) {
         const minMax = getMinMaxAverage(weatherData.list);
         pageState.data = weatherData;
         pageState.statistics = minMax;
         pageState.cityName = weatherData.city.name;
         sessionStorage.setItem(cityName, JSON.stringify(pageState));
      } else {
         pageState.error = true;
      }
   }
   navigation.generateWeatherData(pageState);
}
