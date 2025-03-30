// Character sets
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

// DOM elements
const passwordEl = document.getElementById("password");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const lengthEl = document.getElementById("length");
const lengthValueEl = document.getElementById("length-value");
const includeUpper = document.getElementById("includeUpper");
const includeLower = document.getElementById("includeLower");
const includeNumbers = document.getElementById("includeNumbers");
const includeSymbols = document.getElementById("includeSymbols");
const strengthIndicator = document.getElementById("strengthIndicator");

// Update displayed length value when slider changes
lengthEl.addEventListener("input", () => {
    lengthValueEl.textContent = lengthEl.value;
});

// Function to generate a password based on selected options
function generatePassword() {
    let charPool = "";
    if (includeUpper.checked) charPool += UPPER;
    if (includeLower.checked) charPool += LOWER;
    if (includeNumbers.checked) charPool += NUMBERS;
    if (includeSymbols.checked) charPool += SYMBOLS;

    // If no option is selected, alert the user and return an empty string
    if (!charPool) {
        alert("Please select at least one character type.");
        return "";
    }

    let password = "";
    const length = parseInt(lengthEl.value);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    return password;
}

// Function to estimate password strength (simple example)
function evaluateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

// Update strength indicator color based on strength score
function updateStrengthIndicator(strength) {
    switch (strength) {
        case 0:
        case 1:
            strengthIndicator.style.backgroundColor = "red";
            strengthIndicator.style.boxShadow = "0 0 8px 2px red";
            break;
        case 2:
            strengthIndicator.style.backgroundColor = "orange";
            strengthIndicator.style.boxShadow = "0 0 8px 2px orange";
            break;
        case 3:
            strengthIndicator.style.backgroundColor = "yellow";
            strengthIndicator.style.boxShadow = "0 0 8px 2px yellow";
            break;
        case 4:
            strengthIndicator.style.backgroundColor = "#00ff00";
            strengthIndicator.style.boxShadow = "0 0 8px 2px #00ff00";
            break;
    }
}

// Generate button event
generateBtn.addEventListener("click", () => {
    const pwd = generatePassword();
    passwordEl.value = pwd;
    const strength = evaluateStrength(pwd);
    updateStrengthIndicator(strength);
});

// Copy button event
copyBtn.addEventListener("click", () => {
    if (passwordEl.value) {
        navigator.clipboard.writeText(passwordEl.value).then(() => {
            alert("Password copied to clipboard!");
        });
    }
});