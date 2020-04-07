/* Global Variables */
let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
let userName = '&username=tringa';
let darkSkyUrl = 'https://api.darksky.net/forecast/';
let darkSkyKey = '13906ff7d642fd620e83783e917d200f/';
let pixabayUrl = 'https://pixabay.com/api/';
let pixabayKey = '?key=15825235-241d1f472909d09f4e952d861';
let restCountryUrl = 'https://restcountries.eu/rest/v2/alpha/';



const city = document.getElementById('city').value;


document.getElementById('search').addEventListener('click', performAction);


function performAction(e) {
    const imgSection = document.getElementById('destination-photo');
    if (imgSection.innerHTML == "") {
        getTripInfo()
    } else {
        imgSection.firstElementChild.remove()
        getTripInfo()
    }
}

function getTripInfo() {
    const city = document.getElementById('city').value;
    const tripDate = new Date(document.getElementById('departing-date').value).getTime();
    const days = Client.daysCountdown(tripDate);




    getCityInfo(baseURL, city, userName)
        .then(function (data) {
            console.log(data)
            const countryCode = data.postalCodes[0].countryCode;
            console.log(countryCode)
            const latitude = data.postalCodes[0].lat;
            const longitude = data.postalCodes[0].lng;
            getCityWeather('http://localhost:8081/trip/weather', data = { url: darkSkyUrl + darkSkyKey + latitude + ',' + longitude + ',' + tripDate / 1000 })
                .then(function (data) {
                    document.getElementById('days').innerHTML = city + ',' + ' is ' + days + ' days away'
                    if (days <= 7) {
                        document.getElementById('weather').innerHTML = 'The weather is:'
                        document.getElementById('temp').innerHTML = 'Temp: ' + data.currently.temperature + '°F'
                        document.getElementById('hum').innerHTML = 'Humidity: ' + data.currently.humidity
                        document.getElementById('cloud').innerHTML = 'Clouds: ' + data.currently.cloudCover
                    } else if (days > 7) {
                        document.getElementById('weather').innerHTML = 'Typical weather for then is:'
                        document.getElementById('temp').innerHTML = 'Temp: ' + data.currently.temperature + '°F'
                        document.getElementById('hum').innerHTML = 'Humidity: ' + data.currently.humidity
                        document.getElementById('cloud').innerHTML = 'Clouds: ' + data.currently.cloudCover
                    }

                    getImage('http://localhost:8081/trip/weather/image', data = { url: pixabayUrl + pixabayKey + '&q=' + city + '&image_type=photo' })
                        .then(function (data) {
                            const imgSection = document.getElementById('destination-photo')
                            let newImg = document.createElement('img')
                            newImg.setAttribute('src', data.hits[0].webformatURL)
                            newImg.setAttribute('id', 'api-photo')
                            imgSection.appendChild(newImg)
                            getCountryData(restCountryUrl, countryCode)
                                .then(function (data) {
                                    console.log(data)
                                    document.getElementById('country').innerHTML = 'Country: ' + data.name
                                    document.getElementById('capital').innerHTML = 'Capital: ' + data.capital
                                    document.getElementById('region').innerHTML = 'Region: ' + data.region
                                    document.getElementById('language').innerHTML = 'Language: ' + data.languages[0].name
                                    document.getElementById('currencie').innerHTML = 'Currencie: ' + data.currencies[0].code
                                })

                        })


                })
        })


}

const getCityInfo = async (baseURL, city, userName) => {
    const res = await fetch(baseURL + city + userName)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error)
    }
}


const getCityWeather = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const getImage = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const getCountryData = async (restCountryUrl, countryCode) => {
    const res = await fetch(restCountryUrl + countryCode)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.log('error', error)
    }
}




export { performAction };