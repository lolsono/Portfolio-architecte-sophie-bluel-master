const API_BASE_URL = "http://localhost:5678/api";

const bandeaux = document.querySelector(".bandeaux");
const logoutLink = document.querySelector("#loginLink");
const buttonEdit = document.querySelector(".edit-actions");
const modalContainner = document.querySelector(".modale-container");
const modalTrigger = document.querySelectorAll(".modal-trigger");
const galleryEdit = document.querySelector("gallery-edit"); 

//fetch work
function fetchWorksAndCategories() {

    // Créer deux promesses pour les deux appels fetch
    const worksPromise = fetch(`${API_BASE_URL}/works`)
        .then(response => response.json())
        .then(data => {
            displayWorks(data);
            createGalleryEdit(data);
            return data;
        })
        .catch(error => console.log(error));

    const categoriesPromise = fetch(`${API_BASE_URL}/categories`)
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
            filterInput();
            return data;
        })
        .catch(error => console.log(error));

    // Attendre que les deux promesses soient résolues
    return Promise.all([worksPromise, categoriesPromise])
        .then(([worksData, categoriesData]) => {
            console.log("Works data:", worksData);
            console.log("Categories data:", categoriesData);

            filterInput(worksData, categoriesData);
        })
        .catch(error => console.log(error));
}


// Fonction pour créer une image avec une source donnée
function createImage(url, alt) {
    const image = document.createElement("img");
    image.src = url;
    image.alt = alt;
    return image;
}

//partie filtre

//creation des inputs filtre
function displayCategories (categories) {

    const filtre = document.querySelector(".filtre");
    for (let i=0; i < categories.length; i++) {
        const createInput = document.createElement("input");
        createInput.type = "submit";

        //doit changer celon name
        createInput.value = categories[i].name;

        filtre.appendChild(createInput)

    }   
}

//système d event listenner sur les input

function filterInput(array, value) {
    const inputFiltre = document.querySelector(".filtre")

    inputFiltre.addEventListener("click", function(event) {
        if (event.target.type === "submit") {
            const inputValue = event.target.value;
            console.log(inputValue);

            const galleryContainner = document.querySelector(".gallery");
            //on supprime l ancienne page
            galleryContainner.innerHTML = '';
            const filterData = filterDataWorks(array, inputValue);
            displayWorks(filterData);
        };
    });
};


function filterDataWorks(array, value) {

    if (value === "Tous") {
        filterName = array;
        console.log(filterName);
        return filterName;
    } else {
        const filterName = array.filter(item => item.category.name === value);                        
        console.log(filterName);
        return filterName;
    };
};

//recuperer tout les element input submit dans filtre
//j'ecoute l

//fonction pour afficher la nouvelle page 

function displayWorks (media) {
    const galleryContainner = document.querySelector(".gallery");
    // Faire une boucle pour créer les figures avec les images
    for (let i = 0; i < media.length; i++) {
        // Créer un élément figure pour chaque œuvre
        const figureContainner = document.createElement("figure");
        galleryContainner.appendChild(figureContainner);

        // Créer et ajouter une image dans la figure
        const image = createImage(media[i].imageUrl, media[i].title);
        figureContainner.appendChild(image);

        const titleFigcaption = document.createElement("figcaption");
        titleFigcaption.innerText = media[i].title;

        // Ajouter la figcaption à la figure
        figureContainner.appendChild(titleFigcaption);
    }
};

//gestion de la modale

//fonction création miniature

function createGalleryEdit (media) {

    for (let i = 0; i < media.length; i++) {
        // Créer un élément div
        const cards = document.createElement("div");
        cards.className = "gallery-card";

        // Créer et ajouter l' image dans la div
        const img = document.createElement("img");
        img.src = media[i].imageUrl;
        img.alt = media[i].title;

        // partie bouton dans la div
        const button = document.createElement("button");
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-trash-can";
        button.appendChild(icon);
      
        cards.appendChild(img);
        cards.appendChild(button);

        // Ajouter la div cards dans galleryEdit
        galleryEdit?.appendChild(cards);
    }
};

//bouton déclenchement modal
// a changer crée des problème dans le code
modalTrigger.forEach(trigger => trigger.addEventListener('click', toggleModal));

function toggleModal () {
    modalContainner.classList.toggle("active");
};

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

fetchWorksAndCategories();
logout();
editMode();