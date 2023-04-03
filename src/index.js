const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')

}));
app.set('view engine', 'hbs');



app.set('PORT', process.env.PORT || 4000 );
 

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
 
//Variables Globales

app.use((req,res,next) => {

    next();
});


//Rutas
app.use(require('./routes/routes'));
app.use(require('./routes/register.js'));
app.use('/evaluacion', require('./routes/evaluacion'));
app.use(require('./routes/autentificacion'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Arrancando el servidor
app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en el puerto', app.get('PORT'));
});
