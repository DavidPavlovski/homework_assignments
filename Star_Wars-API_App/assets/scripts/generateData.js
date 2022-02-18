const generateTableData = (container, data, headers) => {
   container.innerHTML = '';
   data.forEach((el) => {
      let row = document.createElement('tr');
      headers.forEach((head) => {
         let td = document.createElement('td');
         td.innerText = el[head];
         row.append(td);
      });
      container.append(row);
   });
};

const generateTableHeader = (container, headerData) => {
   container.innerHTML = '';
   headerData.forEach((el) => {
      let th = document.createElement('th');
      if (el.indexOf('_') !== -1) {
         el = el.replace('_', ' ');
      }
      th.innerText = el;
      container.append(th);
   });
};

export { generateTableData, generateTableHeader };
