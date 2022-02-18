const fetchDataAsync = async (url, index) => {
   try {
      const response = await fetch(url + index);
      const data = await response.json();
      return data;
   } catch (e) {
      console.error(e);
   }
};
export { fetchDataAsync };
