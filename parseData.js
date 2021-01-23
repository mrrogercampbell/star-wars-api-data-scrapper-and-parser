const filmsData = require('./data/json/filmsData.json')
const peopleData = require('./data/json/peopleData.json')
const planetsData = require('./data/json/planetsData.json')
const speciesData = require('./data/json/speciesData.json')
const starshipsData = require('./data/json/starshipsData.json')
const vehiclesData = require('./data/json/vehiclesData.json')

let newPeopleData = peopleData
let newFilmData = filmsData

newPeopleData.map(person => {
    let { films } = person

    films.map((filmPersonIsIn, personIndex) => {
        let filmNIdNumber = parseInt(filmPersonIsIn.split('/')[5])

        filmsData.map(film => {
            const { _id, title } = film
            if (filmNIdNumber === _id) person.films[personIndex] = title

        })
    })
})

// console.log(newPeopleData)


newFilmData.map(film => {
    let { characters } = film

    characters.map((characterInFilm, characterIndex) => {
        let characterIdNumber = parseInt(characterInFilm.split('/')[5])

        newPeopleData.map(person => {
            const { _id, name } = person
            if (characterIdNumber === _id) film.characters[characterIndex] = name
        })
    })
})

// console.log(newFilmData)


const addIdsToEachDataSetItem = (data, endpoint) => {
    let newDataArray = data.map((item, i) => {
        const itemID = item.url.split('/')[5]
        console.log(itemID)
        let newObj = {
            _id: itemID,
            ...item
        }
        return newObj
    })
    return newDataArray
    // this.writeDataToJson(newDataArray, endpoint)
}

addIdsToEachDataSetItem(peopleData, 'kf')
console.log(addIdsToEachDataSetItem(peopleData, 'kf'))