function enterMath() {

    try {
        let firstNumber = prompt("enter first number")

        firstNumber = parseInt(firstNumber)
    
        if (isNaN(firstNumber)) {
            throw new Error("incorrect input")
        }

        let secondNumber = prompt("enter second number") 

        secondNumber = parseInt(secondNumber)

        if (isNaN(secondNumber)) {
            throw new Error("incorrect input")
        }

        let operation = prompt("choose operation (+, -, *, /)")

        let result = solve(firstNumber, secondNumber, operation);

        alert(result)
    }
    catch (error) {
        alert(error.message)
    }
}

function solve(first, second, operation) {
    switch (operation) {
        case "+":
            return first + second
        case "-":
            return first - second
        case "*":
            return first * second
        case "/":
            if (second === 0)
            {
                return 0
            }
            return first / second
        default: 
            return "incorrect operation type"
    }
}