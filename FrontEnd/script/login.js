//je récupere les donner du login
    //ecouter l'evenment du bouton connecter
    //je recupere dans deux variable email et mot de pass

//je transforme en donné json
    //je recupere les info apres que le formulaire sois valider
    //je crée un tableaux avec
    //je convertie ce tableaux avec JSON.stringify(NomDeLaChaineConverti)

//j'envoie ces donner oh serveur
    //dans la methode post j'envoie du .json
    //crée precédament que je met dans le body
    //le header sera 'Content-Type': 'application/json'

//si ces bon on recois le token
    //je renvoie sur la page principale
    //j'enregistre le token dans localstorage
    //sinon j'affiche un message erreur d'indentification 



// Ajouter un écouteur d'événements de soumission de formulaire

//attendre que le dom sois generer
document.addEventListener('DOMContentLoaded', function() {
    
    const form1 = document.querySelector("#loginForm");
    
    form1.addEventListener("submit", function (event) {
    
        event.preventDefault(); 

        //pour les message d erreure
        const messError = document.querySelector("#message");

        //on prend les valeur des saisie
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
    
        console.log(email);
        console.log(password);
    
        //on crée l'objet
        var formData = {
            email: email,
            password: password
        };
    
        // Convertir l'objet en chaîne JSON
        var formDataJson = JSON.stringify(formData);
        
        // Envoyer les données au serveur avec Fetch
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJson
        })
        .then(response => response.json())
        .then(data => {

            //condition si bon mot de passe ou non 
            if (data.token) {
                console.log("Accès validé");
                console.log(data)
                // Stocker le token dans le stockage local
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
                // Redirection vers la page principale ou toute autre action
            } else {
                messError.innerText = "Mauvaise identifiant ou mot de passe";
                console.log(data)
            }

        })

    });
});


