const fetch = require('node-fetch')
const fs = require('fs');
const { throws } = require('assert');

class StarWarsApiScrapper {
    constructor() {
        this.baseURL = 'https://swapi.dev/api/'
        this.endpoints = [
            'films',
            'people',
            'planets',
            'species',
            'starships',
            'vehicles'
        ]
        this.data = {
            filmsData: [],
            peopleData: [],
            planetsData: [],
            speciesData: [],
            starshipsData: [],
            vehiclesData: []
        }
    }

    useTheForce = () => this.endpoints.map(endpoint => this.getStarWarsData(this.baseURL + endpoint, endpoint))

    getStarWarsData = async (url, endPoint) => {
        try {
            console.log('Request in progress...');
            let res = await fetch(url)
            let convertedData = await res.json()
            this.checkIfNext(endPoint, convertedData)
            return res
        } catch (error) {
            console.log('Fetch error: ', error);
        }
    }

    checkIfNext = (endPoint, fetchedData) => {
        let endpointDataObjectKey = `${endPoint}Data`

        if (fetchedData.next !== null) {
            this.data[endpointDataObjectKey].push(...fetchedData.results)
            this.getStarWarsData(fetchedData.next, endPoint)
        } else {
            this.data[endpointDataObjectKey].push(...fetchedData.results)
            this.writeDataToJson(this.data[endpointDataObjectKey], endPoint)
        }
    }

    writeDataToJson = (dataObject, endpoint) => {
        const fileName = `./data/${endpoint}Data.json`
        const stringifiedData = JSON.stringify(dataObject)
        let handleErr = (err) => err ? console.log(err) : console.log('Data written')

        fs.writeFile(fileName, stringifiedData, handleErr)
    }
}


const StarWarsApi = new StarWarsApiScrapper()
StarWarsApi.useTheForce()
