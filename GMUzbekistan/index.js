const path = require('path')
const express = require('express')
const index = express()
const PORT = 3000

index.set('view engine', 'pug')
index.use(express.static(path.join(__dirname, 'public')))
index.use(express.urlencoded({ extended: false }))
index.use(express.json())

index.use('/cars', require('./routes/cars'))

index.get('/', (req, res) => {
    res.render('home', { title: 'Home'})
})

index.listen(PORT, () => {
    console.log(`Uz auto motors app listening on port ${ PORT }`)
})

