import navigation from './assets/scripts/helpers/navigation.js';
import { getCurrentPosition } from './assets/scripts/helpers/navigator.js';
import { fetchCityName, setPageState } from './assets/scripts/helpers/pageState.js';

getCurrentPosition();
navigation.initialize();

let pageState = {
   cityName: '',
   error: false,
   loading: false,
   data: [],
   statistics: {}
};

window.addEventListener('load', async () => {
   const { lat, long } = JSON.parse(sessionStorage.getItem('loc'));
   const { name } = await fetchCityName(lat, long);
   setPageState(pageState, name);
});

navigation.submitForm(async () => {
   setPageState(pageState, navigation.searchField.value);
   navigation.searchField.value = '';
});
