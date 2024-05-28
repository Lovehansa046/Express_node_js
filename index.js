const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static('public'))

// app.get('/', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'views', 'view/index.html'))
//     res.render('index', {
//         title: 'Главная страница',
//         isHome: true
//     })
// })
//
// app.get('/add', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'views', 'view/about.html'))
//     res.render('add', {
//         title: 'Добавить курс',
//         isAdd: true
//     })
// })
//
// app.get('/courses', (req, res) => {
//     res.render('courses', {
//         title: 'Курсы',
//         isCourse: true
//     })
// })

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', courseesRoutes)


// const PORT = process.env.PORT || 3000
//
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })