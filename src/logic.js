const updateInput = (value) => {

  const operators = {
    '+': (str) => {
      const values = str.split('+');
      return Number(values[0]) + Number(values[1]);
    },
    '-': (str) => {
      const values = str.split('-');
      return Number(values[0]) - Number(values[1]);
    },
    '/': (str) => {
      const values = str.split('/');
      return Number(values[0]) / Number(values[1]);
    },
    '*': (str) => {
      const values = str.split('*');
      return Number(values[0]) * Number(values[1]);
    },
    '%': (str) => {
      const values = str.split('%');
      return Number(values[0]) % Number(values[1]);
    },
  };

  const isOperator = (char) => Object.hasOwn(operators, char);
  const inputElement = document.getElementById('input');
  const operationScreen = document.getElementById('operation');
  const currentOperator = operationScreen.value;
  const isUnderOperation = Boolean(currentOperator);

  if (value === 'Clear') {
    inputElement.value = null;
    operationScreen.innerHTML= null;
    operationScreen.value = null;
    return;
  }

  if (value === '=') {
    operationScreen.innerHTML = inputElement.value;
    inputElement.value = (isUnderOperation) ? operators[currentOperator](inputElement.value)
      : inputElement.value;
    operationScreen.value = null;
    return;
  }

  if (isOperator(value)) {
    if (isUnderOperation) updateInput('=');
    operationScreen.value = value;
    const lastChar = inputElement.value.slice(-1);
      inputElement.value = (Object.hasOwn(operators, lastChar) || !inputElement.value)
        ? inputElement.value : inputElement.value + value
    return;  
  }
  
  if (value === '±') {
    if (isUnderOperation) {
      const operands = inputElement.value.split(currentOperator);
      const firstOperand = operands[0]
      const lastOperand = operands[1];
      inputElement.value = `${firstOperand}${currentOperator}${-lastOperand || ''}`;
      return;
    }
    inputElement.value = (inputElement.value) ? -inputElement.value : null;
    return;
  }

  inputElement.value += value;
}

const clickSound = () =>
{
  const click = new Audio('src/audio/tw.ogg');
  click.play();
}
const buttonFunc = (obj) => {
  const value = obj.innerHTML;
  clickSound();
  updateInput(value);
}