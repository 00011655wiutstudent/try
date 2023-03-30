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


router.delete('/delete', (req, res) => {})


router.route('/update/:id')
    .get((req, res) => {})
    .put((req, res) => {})



module.exports = router



function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}