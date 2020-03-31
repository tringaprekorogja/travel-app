/* Global Variables */
let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
let userName = '&username=tringa';
let darkSkyUrl ='https://api.darksky.net/forecast/';
let darkSkyKey ='13906ff7d642fd620e83783e917d200f/';

const city = document.getElementById('city').value;


 document.getElementById('search').addEventListener('click',performAction);


function performAction(e) {

    const city = document.getElementById('city').value;
    const date = document.getElementById('departing-date').value
    const tripDate = new Date(date).getTime();
    console.log(tripDate);
    const now = new Date().getTime();
    const t = tripDate - now;
    const days = Math.floor(t / (1000 * 60 * 60 * 24)) + 1;
    console.log(days);
    


    
    getCityInfo(baseURL, city, userName)
        .then(function (data) {
           const latitude = data.postalCodes[0].lat;
           const longitude = data.postalCodes[0].lng;
           getCityWeather ('http://localhost:8081/trip/weather', data = { url: darkSkyUrl + darkSkyKey + latitude + ',' + longitude + ',' + tripDate/1000})    
           .then(function (data) {     
            document.getElementById('days').innerHTML = city + ',' + ' is ' + days + ' days away'
            if (days<=7) {
                document.getElementById('weather').innerHTML = 'The weather is:'
                document.getElementById('temp').innerHTML ='Temp: ' + data.currently.temperature + '°F'
                document.getElementById('hum').innerHTML = 'Humidity: ' + data.currently.humidity
                document.getElementById('cloud').innerHTML = 'Clouds: ' + data.currently.cloudCover
            } else if (days>7) {
                document.getElementById('weather').innerHTML = 'Typical weather for then is:'
                document.getElementById('temp').innerHTML ='Temp: ' + data.currently.temperature + '°F'
                document.getElementById('hum').innerHTML = 'Humidity: ' + data.currently.humidity
                document.getElementById('cloud').innerHTML = 'Clouds: ' + data.currently.cloudCover
            }
           
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



export {performAction};