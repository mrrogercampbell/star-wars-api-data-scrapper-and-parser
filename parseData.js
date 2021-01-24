const filmsData = require('./data/json/filmsData.json')
const peopleData = require('./data/json/peopleData.json')
const planetsData = require('./data/json/planetsData.json')
const speciesData = require('./data/json/speciesData.json')
const starshipsData = require('./data/json/starshipsData.json')
const vehiclesData = require('./data/json/vehiclesData.json')

let newPeopleData = peopleData
let newFilmData = filmsData


// filmsData.map(film => {
//     let { characters } = film

//     characters.map((characterInFilm, characterIndex) => {
//         // let characterIdNumber = parseInt(characterInFilm.split('/')[5])

//         peopleData.map(person => {
//             const { _id, name, url } = person
//             if (characterInFilm === url) {
//                 film.characters[characterIndex] = name

//             }
//         })
//     })
// })





const filmsCharacterMatchUp = () => {
    filmsData.map(film => {
        const { characters } = film
        let character = film.characters

        characters.map((characterInFilm, characterIndex) => {
            peopleData.map(person => {
                const { name, url } = person
                if (characterInFilm === url) {
                    film.characters[characterIndex] = name

                }
            })
        })
    })
    console.log(filmsData)
    return filmsData
}

//This add each film a person has within their data obj
const personFilmMatchUp = () => {
    peopleData.map(person => {
        let { films } = person

        films.map((film, filmIndex) => {
            filmData.map(movie => {
                const { title, url } = movie
                if (film === url) {
                    person.films[filmIndex] = title

                }
            })
        })
    })

    console.log(peopleData)
    return peopleData
}


// personFilmMatchUp()
// filmsCharacterMatchUp()


// Legend:
// dataToBeAltered | Dataset:
// Should be the data you want to make a change to

// nameOfPropertyToBeAltered | String:
//  Should be the property within dataToBeAltered that you want to iterate over and change

// dataToBeCompared | Dataset:
// The data set you want to pull a name from to fill each instance of nameOfPropertyToBeAltered with

// dataToBeComparedNameProp | String:
// Name of the property you want to use to fill nameOfPropertyToBeAltered with

// Lets say you want to iterate over the Peoples data and fill every film with its proper name you would invoke the function like this:
// dynamicMatchUp(filmData, 'characters', peopleData, 'name')

const dynamicMatchUp = (dataToBeAltered, nameOfPropertyToBeAltered, dataToBeCompared, dataToBeComparedNameProp) => {

    dataToBeAltered.map(singleAlteringData => {
        let propertyToBeIterated = singleAlteringData[nameOfPropertyToBeAltered]

        // console.log(propertyToBeIterated[0])

        propertyToBeIterated.map((alteringItem, alteringItemIndex) => {
            // console.log(alteringItemIndex)

            dataToBeCompared.map(singleComparableItem => {
                // console.log(singleComparableItem)

                const comparableNameProp = singleComparableItem[dataToBeComparedNameProp]
                // console.log(comparableNameProp)


                let { url } = singleComparableItem
                // console.log(url)
                if (alteringItem === url) {
                    // console.log('weve got a match')
                    // console.log(alteringItem)
                    // console.log(propertyToBeIterated[alteringItemIndex])
                    propertyToBeIterated[alteringItemIndex] = comparableNameProp

                }
            })
        })
    })

    console.log(dataToBeAltered)
    return dataToBeAltered
}

// dynamicMatchUp(peopleData, 'films', filmsData, 'title')
// dynamicMatchUp(peopleData, 'vehicles', vehiclesData, 'name')
dynamicMatchUp(peopleData, 'vehicles', vehiclesData, 'name')


// Needs to be rewritten for homeworld due to peopleData.homeworld being a String
// dynamicMatchUp(peopleData, 'homeworld', planetsData, 'name')