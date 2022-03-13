let firstNumber;
let secondNumber;
let currentOperator;
let currentNumber = "";
let fontSize = 40;
let tempNumberLength;
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]

const display = document.querySelector(".display-text")
const allBtns = document.querySelectorAll("button")
const numbers = document.querySelectorAll(".number")
const period = document.querySelector(".period");

numbers.forEach(number => number.addEventListener("click", getNumber))
document.addEventListener("keydown", pressKey)

function pressKey(e) {
    const isNumber = (number) => number === e.key;
    if (currentNumber.includes(".") && e.keyCode === 190) {
        e.preventDefault();
        return;
    } else if (digits.some(isNumber)) {
        currentNumber += e.key
        display.textContent = currentNumber;
    } else if (e.key === "Space") {
        return;
    } else if (e.key === "Backspace") {
        deleteOneCharacter();
    } else if (e.key === "Escape") {
        resetCalculator();
    }
    adjustFontSize(currentNumber)
}

period.addEventListener("click", getDecimal);
function getDecimal(e) {
    if (currentNumber.includes(".")) {
        period.removeEventListener("click", getNumber)
    } else {
        currentNumber += e.currentTarget.id;
        display.textContent = currentNumber;
    }
    adjustFontSize(currentNumber)
}

function getNumber(e) {
    adjustFontSize(currentNumber)
    currentNumber += e.currentTarget.id;
    display.textContent = currentNumber;
}

const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach(operator => operator.addEventListener("click", getOperator));
operatorBtns.forEach(operator => operator.addEventListener("click", styleOperator));

function styleOperator(e) {
    removeOperatorStyle();
    e.currentTarget.classList.add("active")
}

function removeOperatorStyle() {
    operatorBtns.forEach(e => e.classList.remove("active"))
}


function getOperator(e) {
    if (currentOperator === e.currentTarget.id) {
        getSecondNumber()
        operate(currentOperator, firstNumber, secondNumber)
    }

    if (currentNumber !== "") {
        getFirstNumber();
        currentOperator = e.currentTarget.id;
        return;
    }
    if (currentOperator && currentOperator !== e.currentTarget.id) {
        currentOperator = e.currentTarget.id;
        return;
    }
    getFirstNumber();
    currentOperator = e.currentTarget.id;
}

function getFirstNumber() {
    firstNumber = Number(currentNumber);
    currentNumber = "";
}

function getSecondNumber() {
    secondNumber = Number(currentNumber);
    currentNumber = "";
}


const equalsBtn = document.getElementById("Equal");
equalsBtn.addEventListener("click", getEquation);
function getEquation() {
    removeOperatorStyle()
    switch (true) {
        case (currentOperator === "Slash" && currentNumber === ""):
            currentNumber = 1;
            firstNumber = 1;
            return display.textContent = 1;
        case (currentOperator === "*" && currentNumber !== ""):
            getSecondNumber();
            currentOperator = "*";
            operate(currentOperator, firstNumber, secondNumber);
            return;
        case (currentOperator === "*" && currentNumber === ""):
            currentNumber = firstNumber;
            currentOperator = "*";
            getSecondNumber();
            operate(currentOperator, firstNumber, secondNumber);
            return;
        case (currentOperator === "Minus" && currentNumber === ""):
            resetCalculator();
            break;
        case (currentOperator === "+" && currentNumber !== ""):
            getSecondNumber();
            currentOperator = "+";
            operate(currentOperator, firstNumber, secondNumber);
            return;
        case (currentOperator === "+" && currentNumber === ""):
            currentNumber = firstNumber;
            currentOperator = "+";
            getSecondNumber();
            operate(currentOperator, firstNumber, secondNumber);
            return;
    }
    getSecondNumber();
    operate(currentOperator, firstNumber, secondNumber);
    currentOperator = "";
}

const operate = function(operator, firstNumber, secondNumber) {
    if (operator === "+") add(firstNumber, secondNumber);
    if (operator === "Minus") subtract(firstNumber, secondNumber);
    if (operator === "*") multiply(firstNumber, secondNumber);
    if (operator === "Slash") divide(firstNumber, secondNumber);
    if (currentNumber === Infinity) return display.textContent = "Error";
    adjustFontSize(currentNumber)
    return display.textContent = Math.round(currentNumber * (10 ** 11)) / (10 ** 11);
}

const add = function(firstNumber, secondNumber) {
    currentNumber = firstNumber + secondNumber;
    return currentNumber;
}

const subtract = function(firstNumber, secondNumber) {
    currentNumber = firstNumber - secondNumber;
    return currentNumber;
}

const multiply = function(firstNumber, secondNumber) {
    currentNumber = firstNumber * secondNumber;
    return currentNumber;
}

const divide = function(firstNumber, secondNumber) {
    currentNumber = firstNumber / secondNumber;
    return currentNumber;
}


const clearBtn = document.querySelector("#Escape");
clearBtn.addEventListener("click", resetCalculator);
function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    currentNumber = "";
    display.textContent = "0";
    removeOperatorStyle()
    adjustFontSize(currentNumber)
}

const backSpaceBtn = document.querySelector("#Backspace");
backSpaceBtn.addEventListener("click", deleteOneCharacter);
function deleteOneCharacter() {
    adjustFontSize(currentNumber)
    if (display.textContent === "0") return display.textContent = "0";
    if (currentNumber.length === 1) return clearCurrentNumber();
    currentNumber = currentNumber.substring(0, currentNumber.length - 1)
    display.textContent = currentNumber;
}

function clearCurrentNumber() {
    currentNumber = "";
    display.textContent = "0";
}

allBtns.forEach(button => button.addEventListener("mousedown", (e) => e.currentTarget.classList.add("clicked")))
allBtns.forEach(button => button.addEventListener("mouseup", (e) => e.currentTarget.classList.remove("clicked")))

const displayText = document.querySelector(".display-text");
function adjustFontSize(number) {
    let currentNumberLength = number.toString().length
    switch (true) {
        case (currentNumberLength > 50):
            resetCalculator();
            break;
        case (currentNumberLength > 32):
            fontSize = 8;
            break;
        case (currentNumberLength > 25):
            fontSize = 12;
            break;
        case (currentNumberLength > 21):
            fontSize = 15;
            break;
        case (currentNumberLength > 19):
            fontSize = 18;
            break; 
        case (currentNumberLength > 12):
            fontSize = 20;
            break;  
        case (currentNumberLength > 9):
            fontSize = 30;
            break;
        default:
            fontSize = 40;
    }
    displayText.style.fontSize = `${fontSize}px`
}


// HELPER
        // console.log(`FN: ${firstNumber}`)
        // console.log(`SN: ${secondNumber}`)
        // console.log(`CN: ${currentNumber}`)
        // console.log(`CO: ${currentOperator}`)