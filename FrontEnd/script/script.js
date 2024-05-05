const bandeaux = document.querySelector(".bandeaux");
const logoutLink = document.querySelector("#loginLink");
const buttonEdit = document.querySelector(".edit-actions");

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
    displayArray(works);
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

//gestion de la modale


//gestion affichage mode edit
function editMode () {
    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {
        bandeaux.style.display = 'flex';
        logoutLink.innerText = "logout";
        logoutLink.setAttribute('href', 'index.html'); 
        buttonEdit.style.display = 'flex';
    
    }else {
        logoutLink.setAttribute('href', 'auth.html'); 
    }
};

function logout () {

    // Add an event listener to the logoutLink
    logoutLink.addEventListener('click', (event) => {
        if (logoutLink.innerText === "logout") {
            localStorage.removeItem('token');
            editMode(); 
        }
    });

};

logout();
editMode();
createFiltre();
eventListenerFiltre();






