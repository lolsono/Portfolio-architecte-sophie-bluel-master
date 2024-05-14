const API_BASE_URL = "http://localhost:5678/api";

const bandeaux = document.querySelector(".bandeaux");
const logoutLink = document.querySelector("#loginLink");
const buttonEdit = document.querySelector(".edit-actions");
const galleryEdit = document.querySelector(".gallery-edit"); 


import { displayModalOpen } from './modal.js';

//fetch work
export function fetchWorks() {
    return fetch(`${API_BASE_URL}/works`)
        .then(response => response.json())
        .then(data => {
            displayWorks(data);
            displayModalOpen(data);
            buttonDelete(data);
            return data;
        })
        .catch(error => console.log(error));
};

function fetchCategories() {
    return fetch(`${API_BASE_URL}/categories`)
        .then(response => response.json())
        .then(data => {
            displayCategories(data);
            return data;
        })
        .catch(error => console.log(error));
};

function fetchWorksAndCategories() {
    const worksPromise = fetchWorks();
    const categoriesPromise = fetchCategories();

    return Promise.all([worksPromise, categoriesPromise])
        .then(([worksData, categoriesData]) => {
            console.log("Works data:", worksData);
            console.log("Categories data:", categoriesData);
            filterInput(worksData, categoriesData);
        })
        .catch(error => console.log(error));
};


//partie filtre

//creation des inputs filtre
export function displayCategories (categories) {

    const filtre = document.querySelector(".filtre");
    for (let i=0; i < categories.length; i++) {
        const createInput = document.createElement("input");
        createInput.type = "submit";

        //doit changer celon name
        createInput.value = categories[i].name;

        filtre.appendChild(createInput)

    }   
};

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

            // Supprimer la classe 'selected' de tous les éléments de type submit dans la classe 'filtre'
            const submitInputs = document.querySelectorAll(".filtre input[type='submit']");
            submitInputs.forEach(input => input.classList.remove('selected'));

            // Ajouter la classe 'selected' à l'élément qui a déclenché l'événement click
            event.target.classList.add('selected');
        };
    });
};


function filterDataWorks(array, value) {

    if (value === "Tous") {
        const filterName = array;
        console.log(filterName);
        return filterName;
    } else {
        const filterName = array.filter(item => item.category.name === value);                        
        console.log(filterName);
        return filterName;
    };
};


//fonction pour afficher la nouvelle page 

function displayWorks(media) {
    const galleryContainer = document.querySelector(".gallery");
    // Utiliser map pour itérer sur le tableau media et créer une chaîne de caractères représentant les éléments HTML
    const htmlString = media.map(item => {
        return `
            <figure>
                <img src="${item.imageUrl}" alt="${item.title}">
                <figcaption>${item.title}</figcaption>
            </figure>
        `;
    }).join(''); // Utiliser join pour concaténer les éléments HTML en une seule chaîne

    // Utiliser innerHTML pour injecter la chaîne de caractères dans le conteneur .gallery
    galleryContainer.innerHTML = htmlString;
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