const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const app = express();
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const { database }= require('./keys');
const MySQLStore = require('express-mysql-session');
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
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new mysqlstore(database)
  }));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
 
//Variables Globales

app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    next();
});


//Rutas
app.use(require('./routes/routes'));
app.use(require('./routes/recuperarcontra'));
app.use(require('./routes/contranueva'));
app.use(require('./routes/login'));
app.use(require('./routes/index'));
app.use(require('./routes/usuario'));
app.use(require('./routes/tablainformacion'));
app.use(require('./routes/proceso'));
app.use(require('./routes/register.js'));
app.use(require('./routes/evaluacion'));
app.use('/respuesta', require('./routes/respuesta'));
app.use(require('./routes/autentificacion'));
app.use(require('./routes/unidad11'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Arrancando el servidor
app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en el puerto', app.get('PORT'));
});
