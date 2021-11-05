const upperDisplay = document.querySelector(".upper-display")
const lowerDisplay = document.querySelector(".lower-display")
const allKeys = document.querySelectorAll(".key")
const clearButton = document.querySelector(".clear-button")
const deleteButton = document.querySelector(".delete-button")
const keysToBind = document.querySelectorAll(".bind")

lowerDisplay.innerHTML = 0
let operator = ""
let firstNumber = ""
let secondNumber = ""
let prevKey = 0
let result = 0
let clearOrNot = 1 

const binds = ["Delete", "Backspace", 7, 8, 9, "÷", 4, 5, 6, "×", "-", ".", 0, "=", "+"]

document.addEventListener("keydown", e => {
    const key = e.key
    
    if(key === "Delete") clear()
    if(key === "Enter") operateAndDisplay()
    
})

const operateAndDisplay = () => {
    if(operator === ""){ 
        return
    } else if (prevKey === operator && result !== 0) {
        firstNumber = result
    } else if((prevKey !== "=" || prevKey === "Enter") && firstNumber === "") {
        firstNumber = secondNumber
        secondNumber = Number(lowerDisplay.innerHTML)
    } else if (prevKey === "=" || prevKey === "Enter"){
    } else {
        secondNumber = Number(lowerDisplay.innerHTML)
    }
    result = operate(firstNumber, secondNumber, operator)
    if(result % 1 !== 0){
        result = Math.round(result * 1e14) / 1e14
    } 
    lowerDisplay.innerHTML = result
    upperDisplay.innerHTML = ""
    upperDisplay.innerHTML = `${firstNumber} ${operator} ${secondNumber} =`
    firstNumber = result
}

allKeys.forEach(key => key.addEventListener("click", oneOperation = (keybind) => {
    
    if(clearOrNot === 1 && key.value !== operator) {
        lowerDisplay.innerHTML = ""
        clearOrNot = 0
    }
    
    if(key.value === "=" || keybind === "Enter") {
        operateAndDisplay(keybind)
    }

    if(key.value === "+" || key.value === "-" || key.value === "×" || key.value === "÷") {
        if(prevKey !== key.value && firstNumber === "") {
            secondNumber = firstNumber
            firstNumber = Number(lowerDisplay.innerHTML)
        } else if (prevKey === key.value){
            return
        } else {
            secondNumber = Number(lowerDisplay.innerHTML)
        }
        if(upperDisplay.innerHTML.includes(operator) && lowerDisplay.innerHTML !== "" && operator !== "" && secondNumber !== "") {
            result = operate(firstNumber, secondNumber, operator)
            
            if(result % 1 !== 0){
                result = Math.round(result * 1e10) / 1e10
            }
            lowerDisplay.innerHTML = `${result}`
            firstNumber = result
        } 
        
        operator = key.value
        upperDisplay.innerHTML = `${firstNumber} ${operator}`
        clearOrNot = 1
    }
    
    if(key.value === "." && lowerDisplay.innerHTML.includes(".")) return

    if(key.value !== "+" && key.value !== "-" && key.value !== "×" && key.value !== "÷" && key.value !== "=" && lowerDisplay.innerHTML.length < 15) {
        lowerDisplay.innerHTML += key.value
    }
    
    prevKey = key.value
    // console.log(prevKey)
}))

const add = (a, b) => a + b

const subtract = (a, b) => {
    console.log(`first a = ${a}`)
    console.log(`second b = ${b}`)
    return a - b
}

const multiply = (a, b) => a * b

const divide = (a, b) => {
    if(b === 0) return
    return a / b
}


const operate = (a, b, operator) => {
    clearOrNot = 1
    if(operator === "+") {
        return add(a, b)
    } else if (operator === "-") {
        return subtract(a, b)
    } else if (operator === "×") {
        return multiply(a, b)
    } else if(operator === "÷"){
        return divide(a, b)
    } else {
        console.log("divnej operátor")
    }
    
}

clearButton.addEventListener("click", () => clear())

const clear = () => {
    upperDisplay.innerHTML = ""
    lowerDisplay.innerHTML = 0
    operator = ""
    firstNumber = ""
    secondNumber = ""
    prevKey = 0
    result = 0
    clearOrNot = 1
}

deleteButton.addEventListener("click", () => {
    const editedDisplay = lowerDisplay.innerHTML.slice(0, -1)
    lowerDisplay.innerHTML = editedDisplay
    if(lowerDisplay.innerHTML === "") {
        lowerDisplay.innerHTML = 0
        clearOrNot = 1
    }
})
