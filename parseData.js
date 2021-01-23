const { create } = require('domain')
const filmsData = require('./data/json/filmsData.json')
const peopleData = require('./data/json/peopleData.json')
const planetsData = require('./data/json/planetsData.json')
const speciesData = require('./data/json/speciesData.json')
const starshipsData = require('./data/json/starshipsData.json')
const vehiclesData = require('./data/json/vehiclesData.json')


// console.log(`Films Count: ${filmsData.length}`)
// console.log(`Peoples Count: ${peopleData.length}`)
// console.log(`Planets Count: ${planetsData.length}`)
// console.log(`Species Count: ${speciesData.length}`)
// console.log(`Starships Count: ${starshipsData.length}`)
// console.log(`Vehicles Count: ${vehiclesData.length}`)


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