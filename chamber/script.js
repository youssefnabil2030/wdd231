// Handle visit message
function updateVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    let message = '';

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = currentTime - parseInt(lastVisit);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff < 1) {
            message = "Back so soon! Awesome!";
        } else {
            message = `You last visited ${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentTime.toString());
    visitMessage.textContent = message;
}

// Create and populate cards
function createCards(data) {
    const container = document.querySelector('.grid-container');
    
    data.points.forEach((point, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.gridArea = `card${index + 1}`;
        
        card.innerHTML = `
            <figure>
                <img src="${point.image}" alt="${point.name}">
            </figure>
            <div class="card-content">
                <h2>${point.name}</h2>
                <address>${point.address}</address>
                <p>${point.description}</p>
                <button>Learn More</button>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateVisitMessage();
    
    // Fetch and load points of interest
    fetch('data/points-of-interest.json')
        .then(response => response.json())
        .then(data => createCards(data))
        .catch(error => console.error('Error loading points of interest:', error));
});


