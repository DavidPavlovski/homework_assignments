export const generateCountryCard = (country) => {
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

export const generateGrid = (container, countries) => {
   container.innerHTML = '';
   countries.forEach((country) => {
      const card = generateCountryCard(country);
      container.appendChild(card);
   });
};

export const sortCountries = (state, sortBy, descending) => {
   let sorted;
   if (sortBy === 'name') {
      sorted = state.data.sort((a, b) => {
         if (descending) {
            return String(a.name.official).localeCompare(b.name.official);
         }
         return String(b.name.official).localeCompare(a.name.official);
      });
   } else if (sortBy === 'capital') {
      sorted = state.data.sort((a, b) => {
         if (descending) {
            return String(a.capital).localeCompare(b.capital);
         }
         return String(b.capital).localeCompare(a.capital);
      });
   } else {
      sorted = state.data.sort((a, b) => {
         return descending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
      });
   }
   return sorted;
};
