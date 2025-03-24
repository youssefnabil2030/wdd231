// Data
const API_URL = '/data/businesses.json';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const businessList = document.getElementById('businessList');
const eventsList = document.getElementById('eventsList');
const navButtons = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

// State
let data = {
  businesses: [],
  events: []
};

// Fetch data
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    data = await response.json();
    renderBusinesses(data.businesses);
    renderEvents(data.events);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Render businesses
function renderBusinesses(businesses) {
  businessList.innerHTML = businesses.map(business => `
    <div class="business-card">
      <img src="${business.image}" alt="${business.name}">
      <div class="business-card-content">
        <div class="business-header">
          <h3 class="business-name">${business.name}</h3>
          <span class="business-category">${business.category}</span>
        </div>
        <p class="business-description">${business.description}</p>
        <div class="contact-details">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>${business.contact.phone}</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span>${business.contact.email}</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${business.contact.address}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Render events
function renderEvents(events) {
  eventsList.innerHTML = events.map(event => `
    <div class="event-card">
      <div class="event-content">
        <div class="event-details">
          <h3>${event.title}</h3>
          <p class="event-description">${event.description}</p>
          <div class="event-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
              <span>${new Date(event.date).toLocaleDateString()} at ${event.time}</span>
            </div>
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>${event.location}</span>
            </div>
          </div>
        </div>
        <button class="register-btn">
          Register
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="m12 5 7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// Search functionality
function handleSearch(event) {
  const searchTerm = event.target.value.toLowerCase();
  const filteredBusinesses = data.businesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm) ||
    business.category.toLowerCase().includes(searchTerm)
  );
  renderBusinesses(filteredBusinesses);
}

// Tab switching
function switchTab(event) {
  const targetTab = event.target.dataset.tab;
  
  // Update nav buttons
  navButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.tab === targetTab);
  });
  
  // Update tab content
  tabContents.forEach(content => {
    content.classList.toggle('active', content.id === targetTab);
  });
}

// Event listeners
searchInput.addEventListener('input', handleSearch);
navButtons.forEach(button => {
  button.addEventListener('click', switchTab);
});

// Initialize
fetchData();