const BASE_URL = 'https://restcountries.com/v3.1';

const api_config = {
   fetchCountries: async function(){
      const endpoint = `${BASE_URL}/all`;
      return await (await fetch(endpoint)).json();
   },

   searchCountries: async function(searchTerm){
      const endpoint = `${BASE_URL}/name/${searchTerm}`;
      return await (await fetch(endpoint)).json();
   }
};

export default api_config;
