const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const cookieParser = require('cookie-parser');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

const homeRoutes = require('./routes/home');
const cardRoutes = require('./routes/card');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

// Настройка i18next
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
        },
        fallbackLng: 'en',
        preload: ['en', 'ru'],
        detection: {
            order: ['cookie', 'querystring', 'header'],
            caches: ['cookie'],
        },
    });

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        t: (key, opts) => i18next.t(key, opts),
    },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(middleware.handle(i18next));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.post('/setlang', (req, res) => {
    const lang = req.query.lang || 'en'; // Получаем выбранный язык из параметра запроса
    res.cookie('i18next', lang, { maxAge: 900000, httpOnly: true }); // Сохраняем язык в куки
    res.status(200).send(); // Отправляем ответ об успешной смене языка
});

app.use((req, res, next) => {
    const lang = req.cookies.i18next || 'en'; // Получаем язык из куки или используем 'en' по умолчанию
    req.i18n.changeLanguage(lang); // Устанавливаем язык в i18next
    next();
});

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const url = 'mongodb+srv://artjomplotnikovivkhk:Dmy1Vyf5E6weuzwN@cluster0.35obbyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(url, {
            useNewUrlParser: true,
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

start();
