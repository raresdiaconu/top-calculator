const add = function(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

const subtract = function(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

const multiply = function(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

const divide = function(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

let operate = function(operator, firstNumber, secondNumber) {
    if (operator === "+") return add(firstNumber, secondNumber)
}

console.log(operate("+", 1, 2))