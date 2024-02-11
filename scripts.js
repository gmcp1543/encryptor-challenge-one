/*VARIABLES*/
let windowCurrentWidth = window.innerWidth;
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
const desencryptBtn = document.getElementById("desencrypt-btn");
const copyBtn = document.getElementById("copy-btn");
//Especial containers
const inputEncryptor = document.getElementById("input-encryptor");
const resultText = document.getElementById("result-text");
const errorMsgContainer = document.getElementById("error-message");


function copyResultText() {
    
}

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
    const allowedWords = /^[a-z0-9\,\._ ]+$/;

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

desencryptBtn.addEventListener("click", () => {
    let inputValue = inputEncryptor.value;
    let encryptedValue = "";
    const allowedWords = /^[a-z0-9\,\._ ]+$/;

    inputValue = inputValue.trim();
    desencryptBtn.setAttribute("disabled", '');
    desencryptBtn.innerText = "Dencrypting..."

    if (inputValue.length == 0) {
        if (windowCurrentWidth < 1080) {
            inputContainer.style.display = "none";
            resultContainer.style.display = "flex";
        }

        resultPanel.style.display = "none";
        notResultPanel.style.display = "flex";

        desencryptBtn.removeAttribute("disabled");
        desencryptBtn.innerText = "Desencrypt"

        return false;
    }
    
    if (!allowedWords.test(inputValue)) {
        errorMsgContainer.style.color = "#dbc564"
        errorMsgContainer.innerText = "Your message only should have lowercase letters and no special characters.";

        desencryptBtn.removeAttribute("disabled");
        desencryptBtn.innerText = "Desencrypt"
        return false;
    }

    inputValue = inputValue.replaceAll("ai", "a");
    inputValue = inputValue.replaceAll("enter", "e");
    inputValue = inputValue.replaceAll("imes", "i");
    inputValue = inputValue.replaceAll("ober", "o");
    inputValue = inputValue.replaceAll("ufat", "u");

    encryptedValue = inputValue;

    resultText.innerText = encryptedValue;

    if (windowCurrentWidth < 1080) {
        inputContainer.style.display = "none";
        resultContainer.style.display = "flex";
    }

    notResultPanel.style.display = "none";
    resultPanel.style.display = "flex";

    desencryptBtn.removeAttribute("disabled");
    desencryptBtn.innerText = "Desencrypt"
});

copyBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(resultText.innerText);
        alert("You've copied the text");
    } catch (error){
        alert("An error has been found: " + error);
    }
});