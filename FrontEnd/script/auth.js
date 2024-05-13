const API_BASE_URL = "http://localhost:5678/api";

const form = document.querySelector("#loginForm");
const login = document.querySelector("#loginLink");

//pour les message d erreure
const messError = document.querySelector("#message");

//on prend les valeur des saisie

form.addEventListener("submit", function (event) {
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    event.preventDefault(); 

    let formData = {
        email: email,
        password: password
    };
    
    // Convertir l'objet en chaîne JSON
    const formDataJson = JSON.stringify(formData);  
    sendForm(formDataJson);
    console.log(formDataJson);
        
});

// Envoyer les données au serveur avec Fetch
async function sendForm (formDataJson) {
    
    try {
        const reponse = await fetch(`${API_BASE_URL}/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: formDataJson
        });
        
        const tokenData = await reponse.json();
        getResponse(tokenData);

    }catch (error) {
        console.log(error);
    }
};
    
//gestion réponse 

function getResponse (tokenData) {
    //condition si bon mot de passe ou non 
    if (tokenData.token) {
        console.log("Accès validé");
        console.log(tokenData.token)
        // Stocker le token dans le stockage local
        localStorage.setItem('token', tokenData.token);

        // Redirection vers la page principale ou toute autre action
        window.location.href = 'index.html';

    } else {
        messError.innerText = "Mauvaise identifiant ou mot de passe";
        console.log(tokenData)
    }   
};