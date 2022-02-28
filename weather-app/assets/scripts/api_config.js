const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = ''; // <-- your api key goes here

const api_config = {
   fetchCityForecast: async function(cityName){
      const endpoint = `${BASE_URL}/data/2.5/forecast?q=${cityName}&units=metric&&APPID=${API_KEY}`;
      try {
         const res = await fetch(endpoint);
         const data = await res.json();
         return data;
      } catch (e) {
         console.log(e);
      }
   }
};

export default api_config;
