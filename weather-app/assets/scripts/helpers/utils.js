export const getMinMaxAverage = (data) => {
   let min = { temp: Number.POSITIVE_INFINITY, date: '', humidity: Number.POSITIVE_INFINITY };
   let max = { temp: Number.NEGATIVE_INFINITY, date: '', humidity: Number.NEGATIVE_INFINITY };
   let averageTemp = 0;
   let averageHumidity = 0;
   for (let i = 0; i < data.length; i++) {
      let index = data[i];
      if (index.main.humidity < min.humidity) {
         min = { ...min, humidity: index.main.humidity };
      }
      if (index.main.humidity > max.temp) {
         max = { ...max, humidity: index.main.humidity };
      }
      if (index.main.temp_min < min.temp) {
         min = { ...min, temp: index.main.temp_min, date: index.dt_txt };
      }
      if (index.main.temp_max > max.temp) {
         max = { ...max, temp: index.main.temp_max, date: index.dt_txt };
      }
      averageTemp += index.main.temp;
      averageHumidity = averageHumidity += index.main.humidity;
   }
   averageTemp /= data.length;
   averageHumidity /= data.length;
   return { min, max, averageTemp, averageHumidity };
};
