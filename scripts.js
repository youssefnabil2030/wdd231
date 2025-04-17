// Load photos from JSON
async function loadPhotos() {
    try {
        const response = await fetch('data/photos.json');
        const data = await response.json();
        return data.photos;
    } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
}

// Initialize modal
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Setup navigation
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Store current page in localStorage
    const currentPage = window.location.pathname;
    localStorage.setItem('lastVisitedPage', currentPage);
}

// Display photos in grid
function displayPhotos(photos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const photoElements = photos.map(photo => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        
        gridItem.innerHTML = `
            <img src="${photo.url}" 
                 alt="${photo.title}"
                 loading="lazy">
            <h3>${photo.title}</h3>
            <p>${photo.category}</p>
            <p>${photo.date}</p>
        `;
        
        gridItem.addEventListener('click', () => {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDescription');
            
            modalImg.src = photo.url;
            modalTitle.textContent = photo.title;
            modalDesc.textContent = photo.description;
            modal.style.display = 'block';
        });
        
        return gridItem;
    });
    
    container.append(...photoElements);
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    setupNavigation();
    initializeModal();
    
    try {
        const photos = await loadPhotos();
        
        if (document.getElementById('featured-grid')) {
            const featuredPhotos = photos.filter(photo => photo.featured);
            displayPhotos(featuredPhotos, 'featured-grid');
        }
        
        if (document.getElementById('gallery-grid')) {
            displayPhotos(photos, 'gallery-grid');
        }
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});
