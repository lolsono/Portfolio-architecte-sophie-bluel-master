
const form = document.querySelector("#loginForm");
const login = document.querySelector("#loginLink");

//pour les message d erreure
const messError = document.querySelector("#message");

//on prend les valeur des saisie
const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;
    
form.addEventListener("submit", function (event) {
    
    event.preventDefault(); 

    var formData = {
        email: email,
        password: password
    };
    
    // Convertir l'objet en chaîne JSON
    const formDataJson = JSON.stringify(formData);  
    sendForm(formDataJson);
        
});

// Envoyer les données au serveur avec Fetch
async function sendForm (formDataJson) {
    const reponse = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: formDataJson
    })
    
    const tokenData = await reponse.json();
    return tokenData
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
        //window.location.href = 'index.html';

        // Modification de adminMode
        adminMode = true;

    } else {
        messError.innerText = "Mauvaise identifiant ou mot de passe";
        console.log(tokenData)
    }   
};
    

getResponse();