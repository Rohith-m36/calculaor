const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '0';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const buttonValue = button.textContent;

        if (!action) {
            appendNumber(buttonValue);
        } else {
            handleAction(action, buttonValue);
        }
        updateDisplay();
    });
});

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
}

function handleAction(action, value) {
    switch (action) {
        case 'clear':
            currentInput = '0';
            previousInput = '';
            operator = '';
            break;
        case 'delete':
            currentInput = currentInput.slice(0, -1) || '0';
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
            if (currentInput === '') return;
            if (previousInput !== '') {
                calculate();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
            break;
        case 'equals':
            calculate();
            operator = '';
            break;
        case 'decimal':
            appendNumber('.');
            break;
    }
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
}

function updateDisplay() {
    display.textContent = currentInput;
}
