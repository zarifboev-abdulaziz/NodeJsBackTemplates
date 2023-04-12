let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

router.get('/', (req, res) => {
    res.render('students', { students: getAll('students')})
})


router.route('/create')
    .get((req, res) => {
        res.render('create-student', { modules: getAll('modules')})
    })
    .post((req, res) => {
        let students = getAll('students')
        
        students.push({
            id: uniqid(),
            fullname: req.body.fullname,
            age: req.body.age,
            module: req.body.module
        })

        saveAll('students', students)
        
        res.redirect('/students')
    })


router.delete('/delete', (req, res) => {
    
    let students = getAll('students')

    let filteredStudents = students.filter(student => student.id != req.body.id)

    saveAll('students', filteredStudents)

    res.json({ deleted: true })
})


router.route('/update/:id')
    .get((req, res) => {
        let id = req.params.id
        let student = getAll('students').find(student => student.id == id)
        res.render('create-student', { student: student, modules: getAll('modules') })
    })
    .put((req, res) => {
        let id = req.params.id

        let students = getAll('students')

        let student = students.find(student => student.id == id)

        let idx = students.indexOf(student)

        students[idx].fullname = req.body.data.fullname
        students[idx].age = req.body.data.age
        students[idx].module = req.body.data.module

        saveAll('students', students)

        res.json({ updated: true })
    })



module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}