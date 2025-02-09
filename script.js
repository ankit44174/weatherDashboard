document.getElementById('get-weather-btn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = 'afbb11f1b14643c3a7095047252701';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Check if the response status is not OK (404, 500, etc.)
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            alert("City not found or invalid.");
            return;
        }

        const cityName = data.location.name;
        const temperature = `${data.current.temp_c}°C`;
        const description = data.current.condition.text;
        const humidity = `Humidity: ${data.current.humidity}%`;
        const windSpeed = `Wind speed: ${data.current.wind_kph} km/h`;

        // Update the HTML with the fetched data
        document.getElementById('city-name').innerText = cityName;
        document.getElementById('temperature').innerText = temperature;
        document.getElementById('description').innerText = description;
        document.getElementById('humidity').innerText = humidity;
        document.getElementById('wind-speed').innerText = windSpeed;

        // Make the weather information visible
        document.getElementById('weather-info').style.display = 'block';
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather data. Check the console for details.");
    }
}
