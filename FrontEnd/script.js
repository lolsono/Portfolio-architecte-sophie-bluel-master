//fetch work
async function fetchWorks() {
    const reponseWork = await fetch("http://localhost:5678/api/works");
    const works = await reponseWork.json();
    console.log(works);
    // Retourne le tableau des œuvres récupérées
    return works; 
}

fetchWorks();
  
//fetch cathégorie
async function fetchCategories() {
    const reponseCategories = await fetch("http://localhost:5678/api/categories");
    const categories = await reponseCategories.json();
    console.log(categories);
}
  
fetchCategories();

//gerer la partie affichage de works
const galleryContainner = document.querySelector(".gallery");
console.log(galleryContainner);


// Appeler fetchWorks() et traiter le tableau retourné
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

//fonction pour la figcaption
