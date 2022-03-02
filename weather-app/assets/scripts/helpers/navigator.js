function getCurrentPosition(){
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
         sessionStorage.setItem('loc', JSON.stringify({ lat: coords.latitude, long: coords.longitude }));
      });
   }
}

export { getCurrentPosition };
