// JavaScript

// Fixing the Menu Button
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('hide');
});

// Handling Window Resize
function handleResize() {
    if (window.innerWidth > 1000) {
        menu.classList.remove('hide');
    } else {
        menu.classList.add('hide');
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Call it initially

// Image Viewer
const gallery = document.querySelector('.gallery');
const viewer = document.querySelector('.viewer');
const viewerImage = viewer.querySelector('img');
const closeViewerButton = viewer.querySelector('.close-viewer');

function viewerTemplate(imagePath, altText) {
    return `
        <img src="${imagePath}" alt="${altText}">
    `;
}

function viewHandler(event) {
    if (event.target.tagName === 'IMG') {
        const imagePath = event.target.getAttribute('src').replace('-thumb', '-full');
        const altText = event.target.getAttribute('alt');
        viewerImage.src = imagePath;
        viewerImage.alt = altText;
        viewer.style.display = 'flex';
    }
}

function closeViewer() {
    viewer.style.display = 'none';
}

gallery.addEventListener('click', viewHandler);
closeViewerButton.addEventListener('click', closeViewer);
