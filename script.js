const NumberGenerator = (function() {
    return {
        generateRandomNumber: function(existingNumbers) {
            if (existingNumbers.length >= 99) {
                return null; // No se pueden generar más números
            }
            let randomNumber;
            do {
                randomNumber = Math.floor(Math.random() * 99) + 1;
            } while (existingNumbers.includes(randomNumber)); 
            return randomNumber;
        }
    };
})();

// DOM
const DOMHandler = (function() {
    const numberContainer = document.getElementById('numberContainer');

    function formatNumber(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    return {
        renderNumber: function(number) {
            const card = document.createElement('div');
            card.className = 'number-card';
            card.textContent = formatNumber(number); 
            numberContainer.appendChild(card);
        },
        clearNumbers: function() {
            numberContainer.innerHTML = '';
        },
        Mensaje: function() {
            alert("Ya no se pueden generar más números.");
        }
    };
})();

// Lista
const NumberList = (function() {
    let numbers = [];

    return {
        addNumber: function(number) {
            numbers.push(number);
        },
        getNumbers: function() {
            return numbers;
        },
        sortAscending: function() {
            return numbers.sort((a, b) => a - b);
        },
        sortDescending: function() {
            return numbers.sort((a, b) => b - a);
        }
    };
})();

// Máquina de estados
const StateMachine = (function() {
    let currentState = 'esperando'; 

    return {
        setState: function(newState) {
            currentState = newState;
            console.log(`Estado actual: ${currentState}`);
        },
        getState: function() {
            return currentState;
        }
    };
})();

// Controlador de la app
const AppController = (function(NumberGenerator, DOMHandler, NumberList, StateMachine) {
    const generateButton = document.getElementById('generateButton');
    const sortAscButton = document.getElementById('sortAscButton');
    const sortDescButton = document.getElementById('sortDescButton');

    function init() {
        generateButton.addEventListener('click', generateNumber);
        sortAscButton.addEventListener('click', sortAscending);
        sortDescButton.addEventListener('click', sortDescending);
    }

    function generateNumber() {
        StateMachine.setState('generando');
        const existingNumbers = NumberList.getNumbers();
        const randomNumber = NumberGenerator.generateRandomNumber(existingNumbers);
        
        if (randomNumber !== null) {
            NumberList.addNumber(randomNumber);
            DOMHandler.renderNumber(randomNumber);
        } else {
            DOMHandler.Mensaje(); 
        }

        StateMachine.setState('esperando');
    }

    function sortAscending() {
        StateMachine.setState('Ascendente');
        const sortedNumbers = NumberList.sortAscending();
        DOMHandler.clearNumbers();
        sortedNumbers.forEach(number => DOMHandler.renderNumber(number));
        StateMachine.setState('esperando');
    }

    function sortDescending() {
        StateMachine.setState('Descendente');
        const sortedNumbers = NumberList.sortDescending();
        DOMHandler.clearNumbers();
        sortedNumbers.forEach(number => DOMHandler.renderNumber(number));
        StateMachine.setState('esperando');
    }

    return {
        init: init
    };
})(NumberGenerator, DOMHandler, NumberList, StateMachine);

AppController.init();


