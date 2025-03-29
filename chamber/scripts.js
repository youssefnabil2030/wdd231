// Member data
const members = [
    {
        name: "Tech Solutions Inc",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
        phone: "(555) 123-4567",
        address: "123 Tech Ave",
        website: "techsolutions.com",
        membershipLevel: "gold"
    },
    {
        name: "Green Energy Co",
        logo: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=100&h=100&fit=crop",
        phone: "(555) 987-6543",
        address: "456 Solar Street",
        website: "greenenergy.com",
        membershipLevel: "silver"
    },
    {
        name: "Local Cafe",
        logo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop",
        phone: "(555) 456-7890",
        address: "789 Coffee Lane",
        website: "localcafe.com",
        membershipLevel: "gold"
    }
];

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu-btn') && !event.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
        }
    });

    // Initialize spotlights
    initializeSpotlights();

    // Initialize weather (mock data for now)
    initializeWeather();
});

// Function to randomly select and display business spotlights
function initializeSpotlights() {
    const spotlightContainer = document.getElementById('spotlightContainer');
    const eligibleMembers = members.filter(m => ['gold', 'silver'].includes(m.membershipLevel));
    const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    spotlightContainer.innerHTML = selected.map(member => `
        <div class="spotlight">
            <div class="spotlight-content">
                <img src="${member.logo}" alt="${member.name} logo">
                <div class="spotlight-info">
                    <h4>${member.name}</h4>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="https://${member.website}" target="_blank" rel="noopener noreferrer">
                        ${member.website}
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to initialize weather (to be replaced with actual API call)
function initializeWeather() {
    // This would be replaced with actual API call to OpenWeatherMap
    const mockWeather = {
        current: {
            temp: 75,
            description: 'Sunny'
        },
        forecast: [
            { temp: 76, day: 'Tomorrow' },
            { temp: 78, day: 'Day 2' },
            { temp: 74, day: 'Day 3' }
        ]
    };

    updateWeatherUI(mockWeather);
}

// Function to update weather UI
function updateWeatherUI(weather) {
    const currentTemp = document.querySelector('.temperature');
    const description = document.querySelector('.description');
    const forecast = document.querySelectorAll('.forecast-day');

    currentTemp.textContent = `${weather.current.temp}°F`;
    description.textContent = weather.current.description;

    weather.forecast.forEach((day, index) => {
        const dayElement = forecast[index];
        if (dayElement) {
            dayElement.querySelector('span:last-child').textContent = `${day.temp}°F`;
        }
    });
}

// To be implemented: OpenWeatherMap API integration
async function fetchWeather() {
    // Replace with actual API call
    // const API_KEY = 'your-api-key';
    // const city = 'Timbuktu';
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
    // const data = await response.json();
    // return data;
}