function Imperial() {
    const container = document.querySelector('.container');
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    const unitsCheckbox = document.getElementById('units');

    const imageMapping = {
        'Clear': 'clear.png',
        'Rain': 'rain.png',
        'Snow': 'snow.png',
        'Clouds': 'cloud.png',
        'Haze': 'haze.png',
        'Mist': 'mist.png',
        'Fog': 'haze.png',
        'default': ''
    };

    function handleApiResponse(json) {
        if (json.cod === '404') {
            handleNotFoundError();
            return;
        }
        handleWeatherData(json);
    }

    function handleNotFoundError() {
        resetBackground();
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
    }

    function handleWeatherData(json) {
        resetBackground();
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        const imageUrl = imageMapping[json.weather[0].main] || imageMapping['default'];
        image.src = imageUrl ? `assets/${imageUrl}` : '';

        toggleBackground(json.weather[0].main);

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>${unitsCheckbox.checked ? '°C' : '°F'}</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}${unitsCheckbox.checked ? 'm/s' : 'mph'}`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    }

    searchButton.addEventListener('click', () => {
        const APIKey = '6c0935cd403541025c7c59bdce8b79d1';
        const city = searchInput.value;

        if (city === '') return;

        if (document.getElementById('units').checked){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(handleApiResponse);
        } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
            .then(response => response.json())
            .then(handleApiResponse);
        }
    });
}

function resetBackground() {
    document.body.classList.remove('snow', 'rain', 'mist', 'body', 'clouds');
}

function toggleBackground(x){
    let element = document.body;
    if (x==='Snow'){
    element.classList.toggle("snow");
    } else if (x==='Rain'){
        element.classList.toggle("rain");
    } else if (x==='Mist'){
        element.classList.toggle("mist");
    } else if (x==='Clouds'){
        element.classList.toggle("clouds");
    }
    else{
    element.classList.toggle("body");
    }
}
