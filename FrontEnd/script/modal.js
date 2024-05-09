const modalContainner = document.querySelector(".modale-container");
const modalTrigger = document.querySelectorAll(".modal-trigger");

//bouton déclenchement modal
// a changer crée des problème dans le code
modalTrigger.forEach(trigger => trigger.addEventListener('click', toggleModal));

function toggleModal () {
    modalContainner.classList.toggle("active");
};

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
}

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