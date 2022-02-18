let validateNextCall = (button, valid) => {
   if (!valid) {
      button.disabled = true;
   } else {
      if (button.disabled === true) {
         button.disabled = false;
      }
   }
};

function display() {
   [ ...arguments ].forEach((arg) => {
      arg.classList.remove('hidden');
   });
}

function hide() {
   [ ...arguments ].forEach((arg) => {
      arg.classList.add('hidden');
   });
}

export { validateNextCall, display, hide };
