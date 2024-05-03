//fetch work
async function fetchWorks() {
    const reponseWork = await fetch("http://localhost:5678/api/works");
    const works = await reponseWork.json();
    console.log(works);
    // Retourne le tableau des œuvres récupérées
    return works; 
}
  
//fetch cathégorie
async function fetchCategories() {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    console.log(categories);
    return categories;
}

//affichage de basses
fetchWorks().then(works => {
    const galleryContainner = document.querySelector(".gallery");
    console.log(galleryContainner);

    // Faire une boucle pour créer les figures avec les images
    for (let i = 0; i < works.length; i++) {
        // Créer un élément figure pour chaque œuvre
        const figureContainner = document.createElement("figure");
        galleryContainner.appendChild(figureContainner);

        // Créer et ajouter une image dans la figure
        const image = createImage(works[i].imageUrl, works[i].title);
        figureContainner.appendChild(image);

        const titleFigcaption = document.createElement("figcaption");
        titleFigcaption.innerText = works[i].title;

        // Ajouter la figcaption à la figure
        figureContainner.appendChild(titleFigcaption);
    }
});
  

// Fonction pour créer une image avec une source donnée
function createImage(url, alt) {
    const image = document.createElement("img");
    image.src = url;
    image.alt = alt;
    return image;
}

//partie filtre

//creation des inputs filtre
function createFiltre () {
    fetchCategories().then (categories => {
        const filtreContainner = document.querySelector(".filtre");
        
        for (let i=0; i < categories.length; i++) {
            const createInput = document.createElement("input");
            createInput.type = "submit";
    
            //doit changer celon name
            createInput.value = categories[i].name;
    
            filtreContainner.appendChild(createInput)
    
        }
       
    });
}

//système d event listenner personaliser

function eventListenerFiltre () {
    fetchCategories().then (categories => {
        const boutonsFiltre = document.querySelectorAll('.filtre input[type="submit"]');
        console.log(boutonsFiltre);

        boutonsFiltre.forEach(bouton => {

            bouton.addEventListener('click', function() {
                const galleryContainner = document.querySelector(".gallery");
                //on supprime l ancienne page
                galleryContainner.innerHTML = '';

                boutonsFiltre.forEach(b => {
                    b.classList.remove('selected');
                });

                const categorieId = this.value;
                this.classList.add('selected');
                console.log(categorieId);

                fetchWorks().then(works => {
                    // Effectuer des actions après avoir récupéré les œuvres

                    //petite condition si ces tous 
                    if (categorieId === "Tous") {
                        filterName = works;
                        displayArray(filterName);
                        console.log(filterName);
                    }else {
                        const filterName = works.filter(item => item.category.name === categorieId);                        
                        displayArray(filterName);
                        console.log(filterName);
                    };
                });
            });
        });
    });
};

//fonction pour afficher la nouvelle page 

function displayArray (tableau) {
    const galleryContainner = document.querySelector(".gallery");
    // Faire une boucle pour créer les figures avec les images
    for (let i = 0; i < tableau.length; i++) {
        // Créer un élément figure pour chaque œuvre
        const figureContainner = document.createElement("figure");
        galleryContainner.appendChild(figureContainner);

        // Créer et ajouter une image dans la figure
        const image = createImage(tableau[i].imageUrl, tableau[i].title);
        figureContainner.appendChild(image);

        const titleFigcaption = document.createElement("figcaption");
        titleFigcaption.innerText = tableau[i].title;

        // Ajouter la figcaption à la figure
        figureContainner.appendChild(titleFigcaption);
    }
};

//partie login

// Initialisation de adminMode
let adminMode = false;

//attendre que le dom sois generer
document.addEventListener('DOMContentLoaded', function() {
    
    const form1 = document.querySelector("#loginForm");
    const login = document.querySelector("#loginLink");
    
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
                // Redirection vers la page principale ou toute autre action
                window.location.href = 'index.html';

                // Modification de adminMode
                adminMode = true;

            } else {
                messError.innerText = "Mauvaise identifiant ou mot de passe";
                console.log(data)
            }

        })

    });
    
    //function de creation du bandeaux
    function createBannerAtTop () {

    }

    function modificatedNav () {
        //ajout des partie une fois connecter
        if (adminMode = true) {
            console.log("mode admin actif");
            createBannerAtTop();
        };
            
       

        login.innerText = "logout";
    }

});







createFiltre();
eventListenerFiltre();






