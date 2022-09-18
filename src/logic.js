const updateInput = (value) => {

  const operators = {
    '+': (str) => {
      const values = str.split('+');
      console.log(values);
      return Number(values[0]) + Number(values[1]);
    },
    '-': (str) => {
      const values = str.split('-');
      console.log(Number(values[0]) - Number(values[1]))
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
  if (value === '±') {
    inputElement.value = -inputElement.value;
    return;
  }
  if (value === 'Clear') {
    inputElement.value = null;
    operationScreen.innerHTML= null;
    operationScreen.value = null;
    return;
  }

  if (value === '=') {
    operationScreen.innerHTML = inputElement.value;
    const currentOperator = operationScreen.value;
    inputElement.value = (currentOperator) ? operators[currentOperator](inputElement.value)
      : inputElement.value;
    operationScreen.value = null;
    return;
  }

  if (isOperator(value)) {
    operationScreen.value = value;
    const lastChar = inputElement.value.slice(-1);
      inputElement.value = (Object.hasOwn(operators, lastChar) || !inputElement.value)
        ? inputElement.value : inputElement.value + value
    return;  
  }

  inputElement.value += value;
}

const buttonFunc = (obj) => {
  const value = obj.innerHTML;
  updateInput(value);
}