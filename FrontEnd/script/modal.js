

const API_BASE_URL = "http://localhost:5678/api";

const modal = document.getElementById("myModal");
const openModalBtn = document.getElementById("openModalBtn");
const buttonClose = document.querySelector(".close");
const galleryContainner = document.querySelector(".gallery-edit");

//function ouverture de la modale

export function displayModalOpen (data) {
  
    openModalBtn.addEventListener("click", function() {
        modal.style.display = "block";
        displayGalleryEdit(data);
        buttonDelete();
    });
};

const data = displayModalOpen(data);


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
    const containnerEdit = document.querySelector(".gallery-edit");

    const htmlString = media.map(item => {
        return `
        <div class="gallery-card">
            <img src="${item.imageUrl}" alt="${item.title}">
            <button id="${item.id}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `;
    }).join(''); 

    // Utiliser innerHTML pour injecter la chaîne de caractères 
    containnerEdit.innerHTML = htmlString;
};


// gestion de la fonction delete
function buttonDelete() {
    const inputs = document.querySelectorAll(".gallery-card button");
    
    inputs.forEach(input => {
        input.addEventListener("click", function() {
            const idResult = this.id;
            console.log("Input clicked: " + idResult);

            const deleteData = { id: idResult };
            const deleteDataJson = JSON.stringify(deleteData);
            console.log(deleteDataJson);

            fetchDelete(deleteDataJson, );
        });
    });
};

// méthode d'envoie de la demande de suppression
export async function fetchDelete(id, data) {

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${API_BASE_URL}/works/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
        });

        
        if (response.status === 204) {
            console.log("La suppression a réussi.");
            
            //on supprime l ancienne page
            galleryContainner.innerHTML = '';
            displayGalleryEdit(data);


        } else if (response.status === 401) {
            console.log("Vous n'avez pas les permissions");
        } else if (response.status >= 500 && response.status < 600) {
            console.log("Erreur serveur : une erreur est survenue du côté du serveur.");
        } else {
            console.log("Code de statut inconnu :", response.status);
        }

    }catch (error) {
        console.log(error);
    };
    
};

displayModalClose();