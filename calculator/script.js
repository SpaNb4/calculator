class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.isNegative = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '' && this.currentOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  negative() {
    this.isNegative = true;
  }

  compute() {
    let computation;
    if (this.isNegative) {
      if (this.currentOperand > 0) {
        this.currentOperand = -this.currentOperand;
        this.isNegative = false;
      }
      else {
        this.currentOperand = -this.currentOperand;
        this.isNegative = false;
      }
    }
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (this.operation == '√') {
      if (prev > 0) {
        computation =  Math.round((Math.sqrt(prev)) * 10000000) / 10000000;
      }
      else {
        computation = 'Invalid input';
      }
    }
    else {
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = Math.round((prev + current) * 10000000) / 10000000;
          break;
        case '-':
          computation = Math.round((prev - current) * 10000000) / 10000000;
          break;
        case '*':
          computation = Math.round((prev * current) * 10000000) / 10000000;
          break;
        case '÷':
          computation = Math.round((prev / current) * 10000000) / 10000000;
          break;
        case '^':
          computation = Math.round((Math.pow(prev, current)) * 10000000) / 10000000;
          break;
        default:
          return;
      }
    }
    this.readyToReset = true;
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    }
    else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (number == 'Invalid input') {
      integerDisplay = 'Invalid input';
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }
    else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
    else {
      this.previousOperandTextElement.innerText = '';
    }
  }

}
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const sqrtButton = document.querySelector('[data-sqrt]');
const negativeButton = document.querySelector('[data-negative]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});

sqrtButton.addEventListener('click', button => {
  calculator.chooseOperation(sqrtButton.innerText);
  calculator.compute();
  calculator.updateDisplay();
});

negativeButton.addEventListener('click', button => {
  calculator.negative();
  calculator.compute();
  calculator.updateDisplay();
});