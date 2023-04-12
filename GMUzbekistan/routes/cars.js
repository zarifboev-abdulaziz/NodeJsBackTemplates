let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('cars/cars', { carsList: getAllObjects('cars')})
})


router.route('/create')
    .get((req, res) => {
        res.render('cars/create-car')
    })
    .post((req, res) => {
        let carsList = getAllObjects('cars')

        carsList.push({
            id: uniqid(),
            name: req.body.name,
            linkAddress: req.body.linkAddress,
            trunkVolume: req.body.trunkVolume,
            transmission: req.body.transmission,
            safety: req.body.safety,
            fuelConsumption: req.body.fuelConsumption,
            airbags: req.body.airbags
        })

        saveAllObjects('cars', carsList)

        res.redirect('/cars')
    })




router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let car = getAllObjects('cars').find(car => car.id == id)
        res.render('cars/create-car', { car: car })
    })
    .post((req, res) => {
        let id = req.params.id

        let carList = getAllObjects('cars')

        let car = carList.find(car => car.id == id)

        let idx = carList.indexOf(car)

        carList[idx].name = req.body.name
        carList[idx].linkAddress = req.body.linkAddress
        carList[idx].trunkVolume = req.body.trunkVolume
        carList[idx].transmission = req.body.transmission
        carList[idx].safety = req.body.safety
        carList[idx].fuelConsumption = req.body.fuelConsumption
        carList[idx].airbags = req.body.airbags

        saveAllObjects('cars', carList)

        res.redirect('/cars')
    })



router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    let carsList = getAllObjects('cars')

    // console.log(req.body.id)
    carsList = carsList.filter(car => car.id != id)

    saveAllObjects('cars', carsList)

    res.redirect('/cars')
})

module.exports = router


function  getAllObjects(list) {
    return JSON.parse(fs.readFileSync(`./dataFiles/${list}.json`))
}

function saveAllObjects(list, data) {
    fs.writeFileSync(`./dataFiles/${list}.json`, JSON.stringify(data))
}