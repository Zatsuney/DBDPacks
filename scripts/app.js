const imageContainer = document.querySelector('.image-grid');

// Liste manuelle des images à afficher
const images = [
    'images/bright.png',
    'images/magical.png',
    'images/ornament.png',
    'images/bunny.png',
    // Ajoute ici les autres fichiers images de ton dossier
];

// Function to load images into the gallery
function loadImages() {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Gallery Image';
        imgElement.classList.add('gallery-image');
        imageContainer.appendChild(imgElement);
    });
}

// Initialize the image gallery
document.addEventListener('DOMContentLoaded', loadImages);

// Création de l'overlay pour la preview
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.background = 'rgba(0,0,0,0.85)';
overlay.style.display = 'flex';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.zIndex = 1000;
overlay.style.visibility = 'hidden';
overlay.style.opacity = 0;
overlay.style.transition = 'opacity 0.2s';
overlay.innerHTML = `
    <span id="close-preview" style="
        position:absolute;
        top:40px;
        right:60px;
        font-size:3rem;
        color:#fff;
        cursor:pointer;
        z-index:1001;
        font-family:sans-serif;
        user-select:none;
        text-shadow:0 2px 8px #000;
    ">&times;</span>
    <img id="preview-img" src="" alt="Preview" style="
        max-width:90vw;
        max-height:80vh;
        border-radius:18px;
        box-shadow:0 8px 32px #00ff9955, 0 2px 16px #ffea00cc;
        background:#222;
    ">
`;
document.body.appendChild(overlay);

const previewImg = overlay.querySelector('#preview-img');
const closeBtn = overlay.querySelector('#close-preview');

// Fonction pour ouvrir la preview
imageContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        previewImg.src = e.target.src;
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
    }
});

// Fonction pour fermer la preview
closeBtn.addEventListener('click', function() {
    overlay.style.opacity = 0;
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
        previewImg.src = '';
    }, 200);
});

// Fermer la preview en cliquant en dehors de l'image
overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
        closeBtn.click();
    }
});
