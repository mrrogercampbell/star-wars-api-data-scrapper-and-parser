const fetch = require('node-fetch')
const fs = require('fs');

const baseURL = 'https://swapi.dev/api/'
const endpoints = [
    'films',
    'people',
    'planets',
    'species',
    'starships',
    'vehicles'
]

let data = {
    filmsData: [],
    peopleData: [],
    planetsData: [],
    speciesData: [],
    starshipsData: [],
    vehiclesData: []
}

let getStarWarsData = async (url, endPoint) => {
    try {
        console.log('Request in progress...');
        let res = await fetch(url)
        let convertedData = await res.json()
        checkIfNext(endPoint, convertedData)
        return res
    } catch (error) {
        console.log('Fetch error: ', error);
    }
}


const checkIfNext = (endPoint, fetchedData) => {
    let endpointDataObjectKey = `${endPoint}Data`

    if (fetchedData.next !== null) {
        data[endpointDataObjectKey].push(...fetchedData.results)
        getStarWarsData(fetchedData.next, endPoint)
    } else {
        data[endpointDataObjectKey].push(...fetchedData.results)
        writeDataToJson(data[endpointDataObjectKey], endPoint)
    }
}


const writeDataToJson = (dataObject, endpoint) => {
    const fileName = `./data/${endpoint}Data.json`
    const stringifiedData = JSON.stringify(dataObject)
    let handleErr = (err) => err ? console.log(err) : console.log('Data written')

    fs.writeFile(fileName, stringifiedData, handleErr)

}

endpoints.map(endpoint => getStarWarsData(baseURL + endpoint, endpoint))

// getStarWarsData(baseURL + endpoints[1], endpoints[1])

const createNewDataArray = (data) => {
    let newDataArray = data.map((item, i) => {
        // console.log(item)
        let newObj = {
            _id: (i + 1),
            ...item
        }
        return newObj
    })
    return newDataArray
}

console.log(createNewDataArray(planetsData))