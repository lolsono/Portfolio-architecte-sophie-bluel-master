const API_BASE_URL = "http://localhost:5678/api";

const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const buttonClose = document.querySelector(".close");
const token = localStorage.getItem("token");
const galleryEditContainer = document.querySelector(".gallery-edit");
const submitInputNextView = document.querySelector("#NextView");
const modalTitle = document.querySelector(".modal-content h3");
const displayForm = document.querySelector(".form-Add-Porject");
const arrowLeftReturn = document.querySelector(".return");
const option = document.createElement("option");

import { fetchWorks } from "./script.js";

//function ouverture de la modale

export function displayModalOpen(data) {
  openModalBtn.addEventListener("click", function () {
    modal.style.display = "block";
    displayGalleryEdit(data);
    buttonDelete();
  });
}

function displayModalClose() {
  buttonClose.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

//création des vignette de suppression

function displayGalleryEdit(media) {
  const htmlString = media
    .map((item) => {
      return `
        <div class="gallery-card">
            <img src="${item.imageUrl}" alt="${item.title}">
            <button  data-id="${item.id}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `;
    })
    .join("");

  // Utiliser innerHTML pour injecter la chaîne de caractères
  galleryEditContainer.innerHTML = htmlString;
}

// gestion de la fonction delete
export function buttonDelete() {
  galleryEditContainer.addEventListener("click", function (event) {
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
  }).then((response) => {
    handleResponse(response.status);
  });
}

//action en fonction de la reponse sur le statue de la promesse
function handleResponse(status) {
  if (status >= 200 && status < 300) {
    console.log("suppression ok");
    showModal();
  } else if (status === 401) {
    console.log("pas autorisé");
  } else {
    console.log("Comportement inattendu");
  }
}

//rechargement de la partie affichage

function showModal() {
  galleryEditContainer.innerHTML = "";

  fetchWorks()
    .then((data) => {
      displayGalleryEdit(data);
      console.log(data);
    })
    .catch((error) => console.log(error));
}

//gestion de la nouvelle fenêtre ajout de contenue

//ecouteur d evenement du bouton
function nextViewModal() {
  submitInputNextView.addEventListener("click", function () {
    //verifier si il et bien dans la modal d ajout de photo
    if (submitInputNextView.value === "Valider") {
      console.log("submit pour le formulaire");
      //appel d'un fonction de submit du formulaire
      checkEmptyFields();
    } else {
      console.log("next view modal");
      displayNextViewModal();
    }
    returnPreviousModal();
  });
}

//fonction de retour a la modal de supression
function returnPreviousModal() {
  arrowLeftReturn.addEventListener("click", function () {
    console.log("return previous modal");

    //modifie h3
    modalTitle.innerText = "Galerie photo";

    //changement value du boutton
    submitInputNextView.value = "Ajouter une photo";
    submitInputNextView.style.backgroundColor = "#1D6154";
    galleryEditContainer.style.display = "flex";
    displayForm.style.display = "none";
    arrowLeftReturn.style.display = "none";
  });
}

//modification de la fenêtre
function displayNextViewModal() {
  //modifie h3
  modalTitle.innerText = "Ajout photo";

  //changement value du boutton
  submitInputNextView.value = "Valider";
  submitInputNextView.style.backgroundColor = "#A7A7A7";

  galleryEditContainer.style.display = "none";
  displayForm.style.display = "flex";
  arrowLeftReturn.style.display = "flex";
}

//géneration des propostion de cathégories dans le select
export function addSelectOptions(data) {
  data.forEach(function (category) {
    const option = document.createElement("option"); // créer une nouvelle variable option pour chaque élément du tableau data
    option.value = category.name;
    option.textContent = category.name;
    console.log(option.textContent);
    selectCategory.appendChild(option);
  });
}

//verification du contenue du formulaire

//condition pour voir sur le formulaire et bien remplie

const form = document.querySelector(".form-Add-Porject");
const formData = new FormData(form);

//récuperation des tout les chant de saisie
const inputPhoto = document.querySelector("#photo");
const inputTitle = document.querySelector("#title");
const selectCategory = document.querySelector("#category");

// Gestion des champs de saisie qui ne doivent pas être vides
function checkEmptyFields() {
  const valeurNom = inputTitle.value;
  const valeurCategory = selectCategory.value;
  const valeurImage = inputPhoto.files[0];

  const formData = new FormData();

  if (valeurNom === "") {
    console.log("Le champ nom est vide");
  } else {
    console.log(valeurNom);
    formData.append("title", valeurNom);

    if (valeurCategory === "") {
      console.log("Le champ catégorie est vide");
    } else {
      console.log(valeurCategory);
      formData.append("category", valeurCategory);

      if (valeurImage === null) {
        console.log("aucune image selectionée");
      } else {
        console.log("formulaire validé");

        // Récupération de l'URL de l'image sélectionnée
        const imageUrl = URL.createObjectURL(valeurImage);

        // Ajout de l'URL de l'image à l'objet FormData
        formData.append("imageUrl", imageUrl);

        // Appel de la fonction d'envoi du formulaire
        //fetchCreateElement(formData);

        formData.forEach((value, key) => {
          console.log(key + ": " + value);
        });
      }
    }
  }
}

// Fonction d'envoi du formulaire
function fetchCreateElement(formData) {
  fetch(`${API_BASE_URL}/works`, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log(response.status);
  });
}

//récuperation des donner du formulaire
nextViewModal();
//traitement des donner et envoie
displayModalClose();
