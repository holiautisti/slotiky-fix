const slots = ['🍌', '🍒', '🍋', '🍉', '🍇', '🍓', '7️⃣'];
const slotMachine = document.getElementById('slotMachine');
const spinButton = document.getElementById('spin');
const balanceElement = document.getElementById('balance');
const betAmountElement = document.getElementById('betAmount');

let balance = 1000; // Starting balance

function generateGrid() {
    for (let i = 0; i < 9; i++) { // Adjust for 3x3 grid
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('slot');
        slotMachine.appendChild(slotDiv);
    }
}

function checkJackpot(slots) {
    // Check if all elements in the array are the same, indicating a jackpot
    return new Set(slots).size === 1;
}

function spin() {
    const betAmount = parseInt(betAmountElement.value);
    if (betAmount > balance) {
        showMessage("You don't have enough balance to place this bet.");
        return;
    }

    balance -= betAmount; // Deduct bet amount from balance
    updateBalance();

    let symbols = [];

    // Clear message area
    clearMessage();

    document.querySelectorAll('.slot').forEach(slot => {
        const randomSymbol = slots[Math.floor(Math.random() * slots.length)];
        // Reset animation
        slot.style.animation = 'none';
        slot.offsetHeight; /* Trigger reflow */
        slot.style.animation = null; 

        slot.textContent = randomSymbol;
        symbols.push(randomSymbol);
    });

    // Adjusted win condition: if any row or column has all the same symbols
    for (let i = 0; i < 3; i++) {
        if (symbols[i] === symbols[i + 3] && symbols[i] === symbols[i + 6]) {
            balance += betAmount * 5; // Payout for this win condition
            showMessage("You win!");
            document.querySelectorAll('.slot').forEach(slot => slot.classList.add('flash'));
            setTimeout(() => {
                document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('flash'));
            }, 3000); // Stop flashing after 3 seconds
            updateBalance();
            return; // Exit the function early if a win is found
        }
        if (symbols[i * 3] === symbols[i * 3 + 1] && symbols[i * 3] === symbols[i * 3 + 2]) {
            balance += betAmount * 5; // Payout for this win condition
            showMessage("You win!");
            document.querySelectorAll('.slot').forEach(slot => slot.classList.add('flash'));
            setTimeout(() => {
                document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('flash'));
            }, 3000); // Stop flashing after 3 seconds
            updateBalance();
            return; // Exit the function early if a win is found
        }
    }

    if (checkJackpot(symbols)) {
        balance += betAmount * 20; // Jackpot payout
        showMessage("Jackpot! Big Win!");
        document.querySelectorAll('.slot').forEach(slot => slot.classList.add('flash'));
        setTimeout(() => {
            document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('flash'));
        }, 3000); // Stop flashing after 3 seconds
        updateBalance();
    }
}

function showMessage(message) {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = message;
    setTimeout(() => {
        messageArea.textContent = '';
    }, 3000); // Clear message after 3 seconds
}

function clearMessage() {
    const messageArea = document.getElementById('messageArea');
    messageArea.textContent = '';
}


function updateBalance() {
    balanceElement.textContent = balance;
}

spinButton.addEventListener('click', spin);

generateGrid(); // Initialize the grid
updateBalance(); // Initialize balance display

document.querySelectorAll('.slot').forEach(slot => {
    const randomSymbol = slots[Math.floor(Math.random() * slots.length)];
    // Reset animation
    slot.style.animation = 'none';
    slot.offsetHeight; /* Trigger reflow */
    slot.style.animation = null; 

    slot.textContent = randomSymbol;
    symbols.push(randomSymbol);
});

// After determining win or jackpot
if (checkJackpot(symbols)) {
    balance += betAmount * 20; // Jackpot payout
    document.querySelectorAll('.slot').forEach(slot => slot.classList.add('flash'));
    setTimeout(() => {
        document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('flash'));
    }, 3000); // Stop flashing after 3 seconds
    updateBalance();
    alert("Jackpot! Big Win!");
} else if (symbols.some(symbol => symbol === '7️⃣')) { // Adjusted win condition for demonstration
    balance += betAmount * 5; // Regular win payout
    document.querySelectorAll('.slot').forEach(slot => slot.classList.add('flash'));
    setTimeout(() => {
        document.querySelectorAll('.slot').forEach(slot => slot.classList.remove('flash'));
    }, 3000); // Stop flashing after 3 seconds
    updateBalance();
    alert("You win!");
}
