self.onInit = (function() {
    const API_URL = "https://api.open-meteo.com/v1/forecast";
    const LATITUDE = "10.8231";  // Latitude for Ho Chi Minh City
    const LONGITUDE = "106.6297";  // Longitude for Ho Chi Minh City
  
    console.log("Widget Initialized");
  
    // Function to format the date
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
  
    // Function to print data to console
    function printDataToConsole(data) {
        console.log("Weather Data:", data);
    }
  
    // Function to map weather code to description
    function getWeatherDescription(code) {
        const weatherDescriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog and depositing rime fog',
            48: 'Fog and depositing rime fog',
            51: 'Drizzle: Light intensity',
            53: 'Drizzle: Moderate intensity',
            55: 'Drizzle: Dense intensity',
            56: 'Freezing Drizzle: Light intensity',
            57: 'Freezing Drizzle: Dense intensity',
            61: 'Rain: Slight intensity',
            63: 'Rain: Moderate intensity',
            65: 'Rain: Heavy intensity',
            66: 'Freezing Rain: Light intensity',
            67: 'Freezing Rain: Heavy intensity',
            71: 'Snow fall: Slight intensity',
            73: 'Snow fall: Moderate intensity',
            75: 'Snow fall: Heavy intensity',
            77: 'Snow grains',
            80: 'Rain showers: Slight intensity',
            81: 'Rain showers: Moderate intensity',
            82: 'Rain showers: Violent intensity',
            85: 'Snow showers: Slight intensity',
            86: 'Snow showers: Heavy intensity',
            95: 'Thunderstorm: Slight or moderate',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail'
        };
        return weatherDescriptions[code] || 'Unknown weather code';
    }
  
    // Function to map weather code to PNG image URL
    function getWeatherImageUrl(code) {
        const weatherImages = {
            0: 'https://img.icons8.com/?size=100&id=wwWkoh82H4QD&format=png&color=000000',  // Clear sky
            1: 'https://img.icons8.com/?size=100&id=72jK8a9VDKgF&format=png&color=000000',  // Mainly clear
            2: 'https://img.icons8.com/?size=100&id=iZuwxZxWDwvB&format=png&color=000000',  // Partly cloudy
            3: 'https://img.icons8.com/?size=100&id=81744&format=png&color=000000',  // Overcast
            45: 'https://img.icons8.com/?size=100&id=rlR8Lrx77dom&format=png&color=000000',  // Fog
            48: 'https://img.icons8.com/?size=100&id=rlR8Lrx77dom&format=png&color=000000',  // Fog
            51: 'https://img.icons8.com/?size=100&id=15584&format=png&color=000000',  // Drizzle: Light intensity
            53: 'https://img.icons8.com/?size=100&id=39457&format=png&color=000000',  // Drizzle: Moderate intensity
            55: 'https://img.icons8.com/?size=100&id=12278&format=png&color=000000',  // Drizzle: Dense intensity
            56: 'https://img.icons8.com/?size=100&id=eur3a3zGZCxl&format=png&color=000000',  // Freezing Drizzle: Light intensity
            57: 'https://img.icons8.com/?size=100&id=eur3a3zGZCxl&format=png&color=000000',  // Freezing Drizzle: Dense intensity
            61: 'https://img.icons8.com/?size=100&id=AlzZlPZvgLeN&format=png&color=000000',  // Rain: Slight intensity
            63: 'https://img.icons8.com/?size=100&id=18563&format=png&color=000000',  // Rain: Moderate intensity
            65: 'https://img.icons8.com/?size=100&id=18564&format=png&color=000000',  // Rain: Heavy intensity
            66: 'https://img.icons8.com/?size=100&id=67608&format=png&color=000000',  // Freezing Rain: Light intensity
            67: 'https://img.icons8.com/?size=100&id=67608&format=png&color=000000',  // Freezing Rain: Heavy intensity
            71: 'https://img.icons8.com/?size=100&id=15355&format=png&color=000000',  // Snow fall: Slight intensity
            73: 'https://img.icons8.com/?size=100&id=51469&format=png&color=000000',  // Snow fall: Moderate intensity
            75: 'https://img.icons8.com/?size=100&id=80504&format=png&color=000000',  // Snow fall: Heavy intensity
            77: 'https://img.icons8.com/?size=100&id=80504&format=png&color=000000',  // Snow grains
            80: 'https://img.icons8.com/?size=100&id=QZJFPE7TNi5Q&format=png&color=000000',  // Rain showers: Slight intensity
            81: 'https://img.icons8.com/?size=100&id=39336&format=png&color=000000',  // Rain showers: Moderate intensity
            82: 'https://img.icons8.com/?size=100&id=MfIak9BDsryp&format=png&color=000000',  // Rain showers: Violent intensity
            85: 'https://img.icons8.com/?size=100&id=15355&format=png&color=000000',  // Snow showers: Slight intensity
            86: 'https://img.icons8.com/?size=100&id=80504&format=png&color=000000',  // Snow showers: Heavy intensity
            95: 'https://img.icons8.com/?size=100&id=ESeqfDjC5eVO&format=png&color=000000',  // Thunderstorm: Slight or moderate
            96: 'https://img.icons8.com/?size=100&id=6AAyqKfBlzoB&format=png&color=000000',  // Thunderstorm with slight hail
            99: 'https://img.icons8.com/?size=100&id=tlNPUEnNhUe1&format=png&color=000000'  // Thunderstorm with heavy hail
        };
        return weatherImages[code] || 'https://img.icons8.com/?size=100&id=wwWkoh82H4QD&format=png&color=000000';  // Default image
    }
  
    function getWeatherData() {
        console.log("Fetching weather data...");
        return fetch(`${API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`)
            .then(response => {
                console.log("Response received", response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data fetched:", data);
                printDataToConsole(data);  // Print data to console
                return data;
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
  
    function updateWeatherUI(data) {
        console.log("Updating UI with data:", data);
        if (!data || !data.daily || !data.daily.time || data.daily.time.length < 4) {
            console.error('Invalid weather data:', data);
            return;
        }
        for (let i = 0; i < 4; i++) {
            const dayData = data.daily.time[i];
            const weatherCode = data.daily.weathercode[i];
            document.getElementById(`date${i+1}`).innerText = formatDate(dayData);
            document.getElementById(`description${i+1}`).innerText = getWeatherDescription(weatherCode);
            document.getElementById(`temperature${i+1}`).innerText = `${data.daily.temperature_2m_max[i]}°C`;
            document.getElementById(`humidity${i+1}`).innerText = `${data.daily.precipitation_sum[i]}%`;
            document.getElementById(`windspeed${i+1}`).innerText = `${data.daily.windspeed_10m_max[i]} km/h`;
  
            // Update the weather image URL
            const iconElement = document.getElementById(`icon${i+1}`);
            const imageUrl = getWeatherImageUrl(weatherCode);
            console.log(`Setting image for day ${i+1} to ${imageUrl}`);
            iconElement.innerHTML = `<img src="${imageUrl}" alt="Weather icon" style="width: 100px; height: 100px;">`;
        }
    }
  
    function init() {
        console.log("Initialization started");
        getWeatherData().then(data => {
            if (data) {
                console.log("Weather data received:", data);
                updateWeatherUI(data);
            } else {
                console.error("No weather data received");
            }
        });
    }
  
    init();
  })();
  