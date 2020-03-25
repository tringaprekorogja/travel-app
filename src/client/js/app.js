/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=14e5fab081a0a0e66ac8bde37f7ec984&units=metric';
const newZip = document.getElementById('zip').value;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


 document.getElementById('generate').addEventListener('click',performAction);


function performAction(e) {
    console.log('ej')
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, newZip, apiKey)
        .then(function (data) {
            postData('http://localhost:8081/addNewEntry', { temperature: data.main.temp, date: newDate, feelings: feelings })
        })
        .then(
            updateUI()
        )
}
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
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