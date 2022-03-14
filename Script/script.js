let firstNumber;
let secondNumber;
let currentOperator;
let currentNumber = "0";
let fontSize = 40;
let tempNumberLength;
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["/", "*", "+", "-"];

const display = document.querySelector(".display-text")
const allBtns = document.querySelectorAll("button")
const numbers = document.querySelectorAll(".number")
const period = document.querySelector(".period");
const operatorBtns = document.querySelectorAll(".operator");
const equalsBtn = document.getElementById("=");
const clearBtn = document.querySelector("#Escape");
const backSpaceBtn = document.querySelector("#Backspace");
const displayText = document.querySelector(".display-text");

const setMouseDecimal = (e) => setDecimal(e.currentTarget.id);
const setMouseNumber = (e) => setNumber(e.currentTarget.id);
const getMouseOperator = (e) => processOperator(e.currentTarget.id);
const getKeyOperator = (e) => processOperator(e);
const getFirstNumber = () => firstNumber = Number(currentNumber);
const getSecondNumber = () => secondNumber = Number(currentNumber);

numbers.forEach(number => number.addEventListener("click", setMouseNumber))
document.addEventListener("keydown", pressKey)
period.addEventListener("click", setMouseDecimal);
operatorBtns.forEach(operator => operator.addEventListener("click", getMouseOperator));
operatorBtns.forEach(operator => operator.addEventListener("click", styleOperator));
equalsBtn.addEventListener("click", getEquation);
clearBtn.addEventListener("click", resetCalculator);
backSpaceBtn.addEventListener("click", deleteOneCharacter);
window.addEventListener("keydown", styleKeyOperator);
window.addEventListener("keydown", styleButtons);
window.addEventListener("keyup", removeStyleButtons);

function pressKey(e) {
    const isNumber = (number) => number === e.key;
    const isOperator = (operator) => operator === e.key;
    switch (true) {
        case (currentNumber.toString().includes(".") && e.key === "."):
            e.preventDefault();
            break;
        case (e.key === "Space"):
            break;
        case (e.key === "Backspace"):
            deleteOneCharacter();
            break;
        case (e.key === "Escape"):
            resetCalculator();
            break;
        case (e.key === "=" || e.key === "Enter"):
            getEquation();
            break;
        case (operators.some(isOperator)):
            getKeyOperator(e.key);
            break;
        case (digits.some(isNumber)):
            setNumber(e.key);
            break;
        case (e.key === "."):
            setDecimal(e.key);
            break;
    }
}

function setNumber(number) {
    adjustFontSize()
    if (currentOperator === "reset") {
        resetCalculator();
        currentOperator === "isReset";
    }
    if (currentNumber.length === 1 && currentNumber.includes("0")) removeZero()
    currentNumber += number;
    display.textContent = currentNumber;
}

function removeZero() {
    return currentNumber = currentNumber.substring(1);
}

function setDecimal(decimal) {
    if (currentNumber.length === 0) {
        console.log("HIYUH")
        currentNumber += "0" + decimal;
        display.textContent = currentNumber;
    }
    if (currentNumber.includes(".")) {
        period.removeEventListener("click", setNumber)
    } else {
        currentNumber += decimal;
        display.textContent = currentNumber;
    }
    adjustFontSize()
}

function processOperator(operator) {
    if (currentOperator === "reset") {
        currentOperator = operator;
    } else if (currentOperator === operator) {
        if (secondNumber === undefined || secondNumber === "" || currentNumber !== secondNumber) getSecondNumber()
        operate(currentOperator, firstNumber, secondNumber)
    } else if (currentOperator && currentOperator !== operator) {
        getSecondNumber();
        operate(currentOperator, firstNumber, secondNumber)
    }
    getFirstNumber();
    currentNumber = "";
    currentOperator = operator;
}

function getEquation() {
    if (firstNumber === undefined && secondNumber === undefined) return resetCalculator();
    if (firstNumber === "" && secondNumber === "") return resetCalculator();
    if (currentNumber === undefined || currentNumber === "") return resetCalculator();
    if (currentOperator === "reset") return display.textContent = Math.round(currentNumber * (10 ** 5)) / (10 ** 5);
    removeOperatorStyle()
    getSecondNumber();
    currentNumber = ""
    operate(currentOperator, firstNumber, secondNumber);
    currentOperator = "reset";
}

const operate = function(operator, firstNumber, secondNumber) {
    if (operator === "+") add(firstNumber, secondNumber);
    if (operator === "-") subtract(firstNumber, secondNumber);
    if (operator === "*") multiply(firstNumber, secondNumber);
    if (operator === "/") divide(firstNumber, secondNumber);
    if (currentNumber === Infinity) return display.textContent = "error";
    currentNumber = Math.round(currentNumber * (10 ** 5)) / (10 ** 5);
    adjustFontSize()
    if (currentNumber === 0) resetCalculator();
    return display.textContent = currentNumber;
}

const add = (firstNumber, secondNumber) => currentNumber = firstNumber + secondNumber
const subtract = (firstNumber, secondNumber) => currentNumber = firstNumber - secondNumber
const multiply = (firstNumber, secondNumber) => currentNumber = firstNumber * secondNumber
const divide = (firstNumber, secondNumber) => currentNumber = firstNumber / secondNumber

function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    currentNumber = "0";
    display.textContent = "0";
    removeOperatorStyle()
    adjustFontSize()
}

function deleteOneCharacter() {
    adjustFontSize()
    if (display.textContent === "0") return resetCalculator();
    if (currentNumber.length === 1) return clearCurrentNumber();
    currentNumber = currentNumber.substring(0, currentNumber.length - 1)
    display.textContent = currentNumber;
}

function clearCurrentNumber() {
    currentNumber = "";
    display.textContent = "0";
}

function styleOperator(e) {
    removeOperatorStyle();
    e.currentTarget.classList.add("active")
}

function styleKeyOperator(e) {
    const button = document.querySelector(`button[id="${e.key}"]`)
    const isOperator = (operator) => operator === e.key;
    if (operators.some(isOperator)) {
        removeOperatorStyle();
        button.classList.add("active");
    }
}

function removeOperatorStyle() {
    operatorBtns.forEach(e => e.classList.remove("active"))
}

allBtns.forEach(button => button.addEventListener("mousedown", (e) => e.currentTarget.classList.add("clicked")))
allBtns.forEach(button => button.addEventListener("mouseup", (e) => e.currentTarget.classList.remove("clicked")))

function styleButtons(e) {
    const button = document.querySelector(`button[id="${e.key}"]`)
    const enterBtn = document.getElementById("=")
    if (button) button.classList.add("clicked")
    if (e.key === "Enter") enterBtn.classList.add("clicked")
}

function removeStyleButtons(e) {
    const button = document.querySelector(`button[id="${e.key}"]`)
    const enterBtn = document.getElementById("=")
    if (button) button.classList.remove("clicked")
    if (e.key === "Enter") enterBtn.classList.remove("clicked")
}

function adjustFontSize() {
    let currentNumberLength = currentNumber.toString().length
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
        case (currentNumberLength > 20):
            fontSize = 15;
            break;
        case (currentNumberLength > 18):
            fontSize = 18;
            break; 
        case (currentNumberLength > 12):
            fontSize = 21;
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