self.onInit = (function() {
    const API_URL = "https://api.open-meteo.com/v1/forecast";

    console.log("Widget Initialized");

    // Function to format the date
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.getDate();
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        return `${monthNames[date.getMonth()]} ${day}`;
    }

    // Function to print data to console
    function printDataToConsole(data) {
        console.log("Weather Data:", data);
    }

    function getWeatherImageUrl(code) {
        const weatherImages = {
            0: 'https://img.icons8.com/?size=100&id=wwWkoh82H4QD&format=png&color=000000',  // Clear sky
            99: 'https://img.icons8.com/?size=100&id=tlNPUEnNhUe1&format=png&color=000000'  // Thunderstorm with heavy hail
        };
        return weatherImages[code] || 'https://img.icons8.com/?size=100&id=wwWkoh82H4QD&format=png&color=000000';
    }

    async function getWeatherData(latitude, longitude) {
        const response = await fetch(`${API_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`);
        const data = await response.json();
        printDataToConsole(data);
        // Save data to local storage with timestamp
        localStorage.setItem('weatherData', JSON.stringify(data));
        localStorage.setItem('weatherDataTimestamp', Date.now());
        return data;
    }

    function updateWeatherUI(data) {
        if (!data || !data.daily || !data.daily.time || data.daily.time.length < 4) {
            console.error('Invalid weather data:', data);
            return;
        }
        for (let i = 0; i < 5; i++) {
            const dayData = data.daily.time[i];
            const weatherCode = data.daily.weathercode[i];
            document.getElementById(`date${i+1}`).innerText = formatDate(dayData);
            document.getElementById(`temperature${i+1}`).innerText = `${data.daily.temperature_2m_max[i]}°C`;
            document.getElementById(`humidity${i+1}`).innerText = `${data.daily.precipitation_sum[i]}%`;
            document.getElementById(`windspeed${i+1}`).innerText = `${data.daily.windspeed_10m_max[i]} km/h`;
            const iconElement = document.getElementById(`icon${i+1}`);
            iconElement.innerHTML = `<img src="${getWeatherImageUrl(weatherCode)}" alt="Weather icon" style="width: 25px; height: 25px;">`;
        }
    }

    // Load weather data from local storage if available and not expired
    function loadWeatherDataFromLocalStorage() {
        const data = localStorage.getItem('weatherData');
        const timestamp = localStorage.getItem('weatherDataTimestamp');

        // Check if data is less than an hour old
        if (data && timestamp && Date.now() - timestamp < 3600000) {
            updateWeatherUI(JSON.parse(data));
        }
    }

    window.fetchWeather = function() {
        const city = document.getElementById('cityInput').value;
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=1e1614a69192467faa0acdeda1f84410`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                const coords = data.results[0].geometry;
                getWeatherData(coords.lat, coords.lng).then(updateWeatherUI);
            })
            .catch(error => {
                console.error('Error fetching geolocation: ', error);
                document.getElementById('weatherResult').innerText = 'Failed to retrieve geolocation';
            });
    };

    document.addEventListener('DOMContentLoaded', loadWeatherDataFromLocalStorage);

})();
