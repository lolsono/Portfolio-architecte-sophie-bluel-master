const API_BASE_URL = "http://localhost:5678/api";

const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const buttonClose = document.querySelector(".close");
const token = localStorage.getItem("token");
const galleryEditContainer = document.querySelector(".gallery-edit");

import { fetchWorks } from './script.js';

//function ouverture de la modale

export function displayModalOpen (data) {
  
    openModalBtn.addEventListener("click", function() {
        modal.style.display = "block";
        displayGalleryEdit(data);
        buttonDelete();
    });
};


function displayModalClose () {
    buttonClose.onclick = function() {
        modal.style.display = "none";
      };
      
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        };
      };
};
  
//création des vignette de suppression

function displayGalleryEdit(media) {

    const htmlString = media.map(item => {
        return `
        <div class="gallery-card">
            <img src="${item.imageUrl}" alt="${item.title}">
            <button  data-id="${item.id}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `;
    }).join(''); 

    // Utiliser innerHTML pour injecter la chaîne de caractères 
    galleryEditContainer .innerHTML = htmlString;
};


// gestion de la fonction delete
export function buttonDelete() {
    

    galleryEditContainer.addEventListener("click", function(event) {
        const button = event.target.closest("button[data-id]");

        if (button) {
            const idResult = button.dataset.id;
            console.log("Input clicked: " + idResult);
            // Envoyer l'ID directement à la fonction de suppression
            fetchDelete(idResult); 
        }
    });
}

// méthode d'envoie de la demande de suppression


function fetchDelete(id) {
    fetch(`${API_BASE_URL}/works/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        handleResponse(response.status);   
    });
    
};

//action en fonction de la reponse sur le statue de la promesse
function handleResponse(status) {
    if (status >= 200 && status < 300) {
        console.log("suppression ok");
        showModal();
    } else if (status === 401) {
        console.log("pas autorisé");
    } else {
        console.log("Comportement inattendu");
    };
};

//rechargement de la partie affichage 

function showModal() {
    galleryEditContainer.innerHTML='';

    fetchWorks().then(data => {
        displayGalleryEdit(data);
        console.log(data);
    })
    .catch(error => console.log(error));
};

displayModalClose();