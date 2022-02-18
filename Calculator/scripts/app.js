const inputDisplay = document.querySelector('[data-input]');
const resultDisplay = document.querySelector('[data-result]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');

let currentNumber = '';
const nums = '1234567890.'.split('');
const symbols = '-+/*'.split('');

let appendNumber = (target) => {
   if (
      (currentNumber.includes('.') && target.innerText === '.') ||
      (currentNumber[0] === '0' && !currentNumber.includes('.') && target.innerText === '0')
   ) {
      return;
   }
   inputDisplay.innerText += target.innerText;
   currentNumber += target.innerText;
};

let appendOperation = (target) => {
   if (!inputDisplay.innerText) return;
   else if (isNaN(inputDisplay.innerText[inputDisplay.innerText.length - 1])) {
      inputDisplay.innerText = inputDisplay.innerText.slice(0, -1) + target.innerText;
   } else {
      inputDisplay.innerText += target.innerText;
      currentNumber = '';
   }
};
let calculate = () => {
   if (!inputDisplay.innerText) return;
   let result = eval(inputDisplay.innerText);
   resultDisplay.innerText = Number(result).toLocaleString();
};

let clear = () => {
   inputDisplay.innerText = '';
   resultDisplay.innerText = '';
   currentNumber = '';
};

let deleteOne = () => {
   if (!inputDisplay.innerText) return;
   let deleteChar = inputDisplay.innerText[inputDisplay.innerText.length - 1];
   inputDisplay.innerText = inputDisplay.innerText.slice(0, -1);
   currentNumber = currentNumber.slice(0, -1);
   if (isNaN(deleteChar)) {
      currentNumber = '';
      for (let i = inputDisplay.innerText.length - 1; i >= 0; i--) {
         if (isNaN(inputDisplay.innerText[i]) && inputDisplay.innerText[i] !== '.') {
            break;
         }
         currentNumber = inputDisplay.innerText[i] + currentNumber;
      }
   }
};

const utilities = {
   Backspace: {
      target: deleteBtn,
      activeClass: 'red-active',
      action: function() {
         deleteOne();
      }
   },
   Delete: {
      target: clearBtn,
      activeClass: 'red-active',
      action: function() {
         clear();
      }
   },
   Enter: {
      target: equalsBtn,
      activeClass: 'green-active',
      action: function() {
         calculate();
      }
   }
};

numberBtns.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      appendNumber(e.target);
   });
});

operationBtns.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      appendOperation(e.target);
   });
});

equalsBtn.addEventListener('click', calculate);

clearBtn.addEventListener('click', clear);

deleteBtn.addEventListener('click', deleteOne);

document.addEventListener('keydown', (e) => {
   if (nums.indexOf(e.key) !== -1) {
      numberBtns.forEach((btn) => {
         if (btn.innerText === e.key) {
            appendNumber(btn);
            btn.classList.add('blue-active');
         }
      });
   } else if (symbols.indexOf(e.key) !== -1) {
      operationBtns.forEach((btn) => {
         if (btn.innerText === e.key) {
            appendOperation(btn);
            btn.classList.add('grey-active');
         }
      });
   } else if (e.key in utilities) {
      let obj = utilities[e.key];
      const { target, activeClass, action } = obj;
      target.classList.add(activeClass);
      action();
   }
});

document.addEventListener('keyup', (e) => {
   if (nums.indexOf(e.key) !== -1) {
      numberBtns.forEach((btn) => {
         if (btn.innerText === e.key) {
            btn.classList.remove('blue-active');
         }
      });
   } else if (symbols.indexOf(e.key) !== -1) {
      operationBtns.forEach((btn) => {
         if (btn.innerText === e.key) {
            btn.classList.remove('grey-active');
         }
      });
   } else if (e.key in utilities) {
      let obj = utilities[e.key];
      const { target, activeClass, action } = obj;
      target.classList.remove(activeClass);
      action();
   }
});
