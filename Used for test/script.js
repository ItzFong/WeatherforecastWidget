const API_URL = "https://api.open-meteo.com/v1/forecast";
const LATITUDE = "10.8231";  // Latitude for Ho Chi Minh City
const LONGITUDE = "106.6297";  // Longitude for Ho Chi Minh City

// Function to format the date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getMonth()];
    return `${month} ${day}`;
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

// Function to map weather code to Lottie animation URL
function getWeatherAnimationUrl(code) {
    const weatherAnimations = {
        0: 'https://lottie.host/b8a86c1e-b271-40b6-90ad-a0aa8c433aef/FLuR5Gqc2L.json',  // Clear sky
        1: 'https://lottie.host/b8a86c1e-b271-40b6-90ad-a0aa8c433aef/FLuR5Gqc2L.json',  // Mainly clear
        2: 'https://lottie.host/70fc28e8-06dd-4f1e-aa63-9abe6e3f7627/TUXbCCRlLu.json',  // Partly cloudy
        3: 'https://lottie.host/27e56a45-8b3b-4ce7-b277-bfe875c58fb4/sqlO0dQSas.json',  // Overcast
        45: 'https://lottie.host/e1074dae-28bf-4c75-992a-ad7ade617415/wHEtTy0DnN.json',  // Fog
        48: 'https://lottie.host/e1074dae-28bf-4c75-992a-ad7ade617415/wHEtTy0DnN.json',  // Fog
        51: 'https://lottie.host/56c572db-1f1d-48f6-8552-afdef9bf32e6/eCP7f8tFtf.json',  // Drizzle: Light intensity
        53: 'https://lottie.host/56c572db-1f1d-48f6-8552-afdef9bf32e6/eCP7f8tFtf.json',  // Drizzle: Moderate intensity
        55: 'https://lottie.host/56c572db-1f1d-48f6-8552-afdef9bf32e6/eCP7f8tFtf.json',  // Drizzle: Dense intensity
        56: 'https://lottie.host/e4f287ba-9aa1-49a1-bdda-0d2a722fcfb1/g1kM3XlQlb.json',  // Freezing Drizzle: Light intensity
        57: 'https://lottie.host/38feb4b0-d058-424c-bf29-944c61df59a3/5o0bHhdhOn.json',  // Freezing Drizzle: Dense intensity
        61: 'https://lottie.host/b01e2847-66c4-451a-9cb3-a77320f7b46a/bzpalopL4G.json',  // Rain: Slight intensity
        63: 'https://lottie.host/80f3e6e0-d60b-4acd-ab6b-b6c1a2bae93d/GiHisbIKWS.json',  // Rain: Moderate intensity
        65: 'https://lottie.host/7e890ce2-c34d-47a5-afc4-960801bc9a06/Pvd5SGwZDE.json',  // Rain: Heavy intensity
        66: 'https://lottie.host/e4f287ba-9aa1-49a1-bdda-0d2a722fcfb1/g1kM3XlQlb.json',  // Freezing Rain: Light intensity
        67: 'https://lottie.host/38feb4b0-d058-424c-bf29-944c61df59a3/5o0bHhdhOn.json',  // Freezing Rain: Heavy intensity
        // 71: 'https://assets9.lottiefiles.com/private_files/lf30_w51pcehl.json',  // Snow fall: Slight intensity
        // 73: 'https://assets9.lottiefiles.com/private_files/lf30_w51pcehl.json',  // Snow fall: Moderate intensity
        // 75: 'https://assets9.lottiefiles.com/private_files/lf30_w51pcehl.json',  // Snow fall: Heavy intensity
        // 77: 'https://assets9.lottiefiles.com/private_files/lf30_w51pcehl.json',  // Snow grains
        80: 'https://lottie.host/b01e2847-66c4-451a-9cb3-a77320f7b46a/bzpalopL4G.json',  // Rain showers: Slight intensity
        81: 'https://lottie.host/80f3e6e0-d60b-4acd-ab6b-b6c1a2bae93d/GiHisbIKWS.json',  // Rain showers: Moderate intensity
        82: 'https://lottie.host/7e890ce2-c34d-47a5-afc4-960801bc9a06/Pvd5SGwZDE.json',  // Rain showers: Violent intensity
        // 85: 'https://lottie.host/7eb74f4b-75ca-4e2c-823c-dc0b30347905/mgbKnqh2se.json',  // Snow showers: Slight intensity
        // 86: 'https://assets9.lottiefiles.com/private_files/lf30_w51pcehl.json',  // Snow showers: Heavy intensity
        95: 'https://lottie.host/1fda3e05-dfe8-417c-b067-c3ea663ceb49/euRmZ45R4N.json',  // Thunderstorm: Slight or moderate
        96: 'https://lottie.host/95920a1c-fb2b-4c32-8f88-43132b04a33c/Zseeft0NLc.json',  // Thunderstorm with slight hail
        99: 'https://lottie.host/74239ab9-4a1c-4003-9018-8b7571f044fa/GdVK3UpJ2d.json'   // Thunderstorm with heavy hail
    };
    return weatherAnimations[code] || 'https://lottie.host/b8a86c1e-b271-40b6-90ad-a0aa8c433aef/FLuR5Gqc2L.json';  // Default animation
}

async function getWeatherData() {
    const response = await fetch(`${API_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode&timezone=auto`);
    const data = await response.json();
    printDataToConsole(data);  // Print data to console
    return data;
}

function updateWeatherUI(data) {
    for (let i = 0; i < 5; i++) {
        const dayData = data.daily.time[i];
        const weatherCode = data.daily.weathercode[i];
        document.getElementById(`date${i+1}`).innerText = formatDate(dayData);
        // document.getElementById(`description${i+1}`).innerText = getWeatherDescription(weatherCode);
        document.getElementById(`temperature${i+1}`).innerText = `${data.daily.temperature_2m_max[i]}°C`;
        document.getElementById(`humidity${i+1}`).innerText = `${data.daily.precipitation_sum[i]}%`;
        document.getElementById(`windspeed${i+1}`).innerText = `${data.daily.windspeed_10m_max[i]} km/h`;

        // Update the Lottie animation URL
        const iconElement = document.getElementById(`icon${i+1}`);
        iconElement.innerHTML = `<lottie-player src="${getWeatherAnimationUrl(weatherCode)}" background="transparent" speed="1" style="width: 100px; height: 100px" loop autoplay mode="normal"></lottie-player>`;
    }
}

async function init() {
    const weatherData = await getWeatherData();
    updateWeatherUI(weatherData);
}

document.addEventListener('DOMContentLoaded', init);
