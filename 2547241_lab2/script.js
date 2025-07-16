
// Fade in animation on scroll
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', fadeInOnScroll);

// Fetch API - Multiple travel-related APIs
async function fetchTravelData() {
    try {
        const countriesResponse = await fetch('https://restcountries.com/v3.1/region/europe?fields=name,capital,flag,population,region');
        const countries = await countriesResponse.json();
        
        const apiContent = document.getElementById('api-content');
        apiContent.innerHTML = '';
        
        // Display first 6 countries
        countries.slice(0, 6).forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.className = 'bg-gray-700 p-6 rounded-lg shadow-lg fade-in hover:transform hover:scale-105 transition-transform';
            countryCard.innerHTML = `
                <div class="text-center">
                    <div class="text-4xl mb-4">${country.flag}</div>
                    <h3 class="text--400 font-semibold mb-2">${country.name.common}</h3>
                    <p class="text-gray-300 mb-2"><i class="fas fa-map-marker-alt mr-2"></i>${country.capital?.[0] || 'N/A'}</p>
                    <p class="text-gray-400 text-sm">Population: ${country.population.toLocaleString()}</p>
                    <p class="text-gray-400 text-sm">Region: ${country.region}</p>
                </div>
            `;
            apiContent.appendChild(countryCard);
        });
        
        fadeInOnScroll();
        
    } catch (error) {
        console.error('Error fetching countries:', error);
        await fetchTravelTips(); // Fallback to quotes
    }
}

// Alternative: Weather API for destinations
async function fetchWeatherData() {
    const cities = ['Paris', 'Tokyo', 'New York', 'London', 'Sydney', 'Dubai'];
    const apiKey = 'YOUR_API_KEY'; // You need to register for free at openweathermap.org
    
    try {
        const apiContent = document.getElementById('api-content');
        apiContent.innerHTML = '';
        
        for (const city of cities) {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            
            const weatherCard = document.createElement('div');
            weatherCard.className = 'bg-gray-700 p-6 rounded-lg shadow-lg fade-in';
            weatherCard.innerHTML = `
                <div class="text-center">
                    <i class="fas fa-cloud-sun text-emerald-400 text-2xl mb-4"></i>
                    <h3 class="text-emerald-400 font-semibold mb-2">${data.name}</h3>
                    <p class="text-gray-300 mb-2">${Math.round(data.main.temp)}°C</p>
                    <p class="text-gray-400 text-sm">${data.weather[0].description}</p>
                </div>
            `;
            apiContent.appendChild(weatherCard);
        }
        
        fadeInOnScroll();
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        await fetchTravelData(); // Fallback to countries
    }
}

// Try to fetch travel data when page loads
document.addEventListener('DOMContentLoaded', async function() {
    // Add fade-in class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // Try different APIs in order of preference
    try {
        await fetchTravelData(); // Try countries API first
    } catch (error) {
        try {
            await fetchTravelTips(); // Fallback to quotes
        } catch (error) {
            await fetchAlternativeTips(); // Final fallback
        }
    }
});

// Contact form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});
