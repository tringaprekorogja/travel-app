/* Global Variables */
let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
let userName = '&username=tringa';
const city = document.getElementById('city').value;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



 document.getElementById('search').addEventListener('click',performAction);


function performAction(e) {

    const city = document.getElementById('city').value;
    const date = document.getElementById('departing-date').value
    let tripDate = new Date(date).getTime();
    let now = new Date().getTime();
    let t = tripDate - now;
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    console.log(days);
    
    

    
    getCityInfo(baseURL, city, userName)
        .then(function (data) {
           console.log(data.postalCodes[0].countryCode);
           postData('http://localhost:8081/addNewEntry', { Country: data.postalCodes[0].countryCode, Latitude: data.postalCodes[0].lat, Longitude: data.postalCodes[0].lng})
        })
        .then(
            updateUI()
        )
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

const postData = async (url = '', data = {}) => {
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

const updateUI = async () => {
    const request = await fetch('http://localhost:8081/allEntries');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = 'Temp: ' + allData.temperature + ' °C';
        document.getElementById('date').innerHTML = 'Date: ' + allData.date;
        document.getElementById('content').innerHTML = 'Feeling ' + allData.feelings + '.';

    } catch (error) {
        console.log("error", error);
    }
}

export {performAction};