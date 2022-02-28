const displayStatistics = (container, data) => {
   const { statistics } = data;

   if (data.error) {
      container.innerHTML = `<h1>Cannot get statistics data for ${navigation.searchField.value}</h1>`;
      return;
   }
   container.innerHTML = `
      <h1>Weather Data for : ${data.cityName}</h1>
      <div class='container my-5'> 
            <div class='row'> 
               <div class='col-6 card'>
                  <div class='card-body'> 
                     <h3 class='card-title'>Humidity</h3>
                     <p class='card-text'>Average humidity : ${statistics.averageHumidity}</p>
                     <p class='card-text'>Max humidity : ${statistics.max.humidity}</p>
                     <p class='card-text'>Min humidity : ${statistics.min.humidity}</p>
                  </div>
               </div>
               <div class='col-6 card'>
                  <div class='card-body'> 
                     <h3 class='card-title'>Temperature</h3>
                     <p class='card-text'>Average Temperature : ${statistics.averageTemp.toFixed(2)} C<sup>o</sup></p>
                     <p class='card-text'>Max Temperature : ${statistics.max.temp} C<sup>o</sup>
                        / date : <b>${statistics.max.date}</b>
                      </p>
                     <p class='card-text'>Min Temperature : ${statistics.min.temp} C<sup>o</sup>
                        / date : <b>${statistics.min.date}</b>
                     </p>
                  </div>
               </div>
            </div>
      </div>
   `;
};

const displayHourly = (container, data) => {
   if (data.error) {
      container.innerHTML = `<h1>Cannot get hourly data for ${navigation.searchField.value}</h1>`;
      return;
   }
   const { list } = data.data;
   console.log(list[0]);
   const tbody = document.createElement('tbody');
   list.forEach((el) => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
         <td><img src='http://openweathermap.org/img/wn/${el.weather[0].icon}.png'></td>
         <td>${el.weather[0].description}</td>
         <td>${el.dt_txt}</td>
         <td>${el.main.temp} C<sup>o</sup></td>
         <td>${el.main.humidity} g/m<sup>3</sup</td>
         <td>${el.wind.speed} m/sec</td>
      `;
      tbody.appendChild(tableRow);
   });

   container.innerHTML = `<h1>Hourly weather data for : ${data.cityName}</h1>
      <table class='table table-primary table-striped my-5 px-5'>
         <thead>
            <tr>
               <th scope='col'>weather icon</th>
               <th scope='col'>weather</th>
               <th scope='col'>date</th>
               <th scope='col'>temperature</th>
               <th scope='col'>humidity</th>
               <th scope='col'>wind speed</th>
            </tr>
         </thead>
      </table>`;
   document.querySelector('table').appendChild(tbody);
};

const navigation = {
   navLinks: document.getElementsByClassName('nav-link'),
   searchForm: document.getElementById('search-form'),
   searchField: document.getElementById('search-field'),
   pages: document.getElementsByClassName('page'),
   activeLink: function(target){
      const active = document.querySelector('.active');
      active.classList.remove('active');
      target.classList.add('active');
      this.displayPage(target.innerText);
   },
   displayPage: function(page){
      [ ...this.pages ].forEach((page) => {
         page.classList.remove('page-active');
      });
      document.getElementById(page.toLowerCase()).classList.add('page-active');
   },
   addEventListeners: function(){
      [ ...this.navLinks ].forEach((link) => {
         link.addEventListener('click', (e) => {
            this.activeLink(e.target);
         });
      });
   },
   initialize: function(){
      this.addEventListeners();
      const active = document.querySelector('.active');
      document.getElementById(active.innerText.toLowerCase()).classList.add('page-active');
   },
   submitForm: function(callback){
      this.searchForm.addEventListener('submit', (e) => {
         e.preventDefault();
         callback();
      });
   },
   generateWeatherData: function(weatherData){
      const hourlyContainer = document.getElementById('hourly');
      const statisticContainer = document.getElementById('statistics');
      displayStatistics(statisticContainer, weatherData);
      displayHourly(hourlyContainer, weatherData);
   }
};

export default navigation;
