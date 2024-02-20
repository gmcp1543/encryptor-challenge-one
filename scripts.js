/*VARIABLES*/
let windowCurrentWidth = window.innerWidth;
const allowedWords = /^[a-z0-9\,\._\n ]+$/;
//Containers
const inputContainer = document.getElementById("input-container");
const resultContainer = document.getElementById("result-container");
//Panels
const notResultPanel = document.getElementById("not-result-panel");
const resultPanel = document.getElementById("result-panel");
//Buttons
const openResultBtn = document.getElementById("open-result-btn");
const goBackBtns = Array.from(document.getElementsByClassName("go-back-btn"));
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const copyBtn = document.getElementById("copy-btn");
//Especial containers
const inputEncryptor = document.getElementById("input-encryptor");
const resultText = document.getElementById("result-text");
const errorMsgContainer = document.getElementById("error-message");


//Events
openResultBtn.addEventListener("click", () => {
    let inputValue = inputEncryptor.value;

    inputValue = inputValue.trim();
    inputContainer.style.display = "none";
    resultContainer.style.display = "flex";

    if (resultText.innerText == "") {
        resultPanel.style.display = "none";
        notResultPanel.style.display = "flex";
    } else {
        notResultPanel.style.display = "none";
        resultPanel.style.display = "flex";
    }
});

goBackBtns.forEach(element => {
    element.addEventListener("click", () => {
        resultPanel.style.display = "none";
        notResultPanel.style.display = "none";
        resultContainer.style.display = "none";

        inputContainer.style.display = "flex";
    });
});

window.addEventListener("resize", () => {
    if (windowCurrentWidth < 1080 && window.innerWidth >= 1080) {
        windowCurrentWidth = window.innerWidth;
        inputContainer.style.display = "flex";
        resultContainer.style.display = "flex";

        if (resultText.innerText == "") {
            resultPanel.style.display = "none";
            notResultPanel.style.display = "flex";
        } else {
            notResultPanel.style.display = "none";
            resultPanel.style.display = "flex";
        }
    } else if (windowCurrentWidth >= 1080 && window.innerWidth < 1080) {
        windowCurrentWidth = window.innerWidth;

        if (resultContainer.style.display == "flex") {
            inputContainer.style.display = "none";
        } else {
            resultContainer.style.display = "none";
        }
    }

    
});

encryptBtn.addEventListener("click", () => {
    let inputValue = inputEncryptor.value;
    let encryptedValue = "";

    inputValue = inputValue.trim();
    encryptBtn.setAttribute("disabled", '');
    encryptBtn.innerText = "Encrypting..."

    if (inputValue.length == 0) {
        if (windowCurrentWidth < 1080) {
            inputContainer.style.display = "none";
            resultContainer.style.display = "flex";
        }

        resultPanel.style.display = "none";
        notResultPanel.style.display = "flex";

        encryptBtn.removeAttribute("disabled");
        encryptBtn.innerText = "Encrypt"

        return false;
    }
    
    if (!allowedWords.test(inputValue)) {
        errorMsgContainer.style.color = "#dbc564"
        errorMsgContainer.innerText = "Your message only should have lowercase letters and not accents.";

        encryptBtn.removeAttribute("disabled");
        encryptBtn.innerText = "Encrypt"
        return false;
    }

    inputValue.split("").forEach((v) => {
        switch (v) {
            case "a":
                encryptedValue += "ai";
                break;
            case "e":
                encryptedValue += "enter";
                break;
            case "i":
                encryptedValue += "imes";
                break;
            case "o":
                encryptedValue += "ober";
                break;
            case "u":
                encryptedValue += "ufat";
                break;
            default:
                encryptedValue += v;
                break;
        }
    });

    resultText.innerText = encryptedValue;

    if (windowCurrentWidth < 1080) {
        inputContainer.style.display = "none";
        resultContainer.style.display = "flex";
    }

    notResultPanel.style.display = "none";
    resultPanel.style.display = "flex";

    encryptBtn.removeAttribute("disabled");
    encryptBtn.innerText = "Encrypt"
});

decryptBtn.addEventListener("click", () => {
    let inputValue = inputEncryptor.value;
    let decryptedValue = "";

    inputValue = inputValue.trim();
    decryptBtn.setAttribute("disabled", '');
    decryptBtn.innerText = "Decrypting..."

    if (inputValue.length == 0) {
        if (windowCurrentWidth < 1080) {
            inputContainer.style.display = "none";
            resultContainer.style.display = "flex";
        }

        resultPanel.style.display = "none";
        notResultPanel.style.display = "flex";

        decryptBtn.removeAttribute("disabled");
        decryptBtn.innerText = "Decrypt"

        return false;
    }
    
    if (!allowedWords.test(inputValue)) {
        errorMsgContainer.style.color = "#dbc564"
        errorMsgContainer.innerText = "Your message only should have lowercase letters and no special characters.";

        decryptBtn.removeAttribute("disabled");
        decryptBtn.innerText = "Decrypt"
        return false;
    }

    inputValue = inputValue.replaceAll("ai", "a");
    inputValue = inputValue.replaceAll("enter", "e");
    inputValue = inputValue.replaceAll("imes", "i");
    inputValue = inputValue.replaceAll("ober", "o");
    inputValue = inputValue.replaceAll("ufat", "u");

    decryptedValue = inputValue;

    resultText.innerText = decryptedValue;

    if (windowCurrentWidth < 1080) {
        inputContainer.style.display = "none";
        resultContainer.style.display = "flex";
    }

    notResultPanel.style.display = "none";
    resultPanel.style.display = "flex";

    decryptBtn.removeAttribute("disabled");
    decryptBtn.innerText = "Decrypt"
});

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(resultText.innerText);
        alert("You've copied the text");
    } catch (error){
        alert("An error has been found: " + error);
    }
});