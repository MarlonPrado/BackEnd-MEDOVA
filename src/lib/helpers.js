const Handlebars = require('handlebars');

// Registro del helper
Handlebars.registerHelper('splitOptions', function(optionsString) {
  // Verificar si se proporciona una cadena de opciones
  if (!optionsString || typeof optionsString !== 'string') {
    return '';
  }

  // Separar las opciones usando el carácter ";"
  var optionsArray = optionsString.split(';');

  // Ordenar de forma aleatoria las opciones
  optionsArray.sort(function() {
    return 0.5 - Math.random();
  });

  // Retornar el arreglo de opciones
  return optionsArray;
});

Handlebars.registerHelper('splitAndAccess', function (string, index) {
  const array = string.split(';');
  return array[index];
});


Handlebars.registerHelper('progressBar', function(number) {
  const progress = [
    { width: '10%', color: 'bg-danger' },
    { width: '20%', color: 'bg-warning' },
    { width: '30%', color: 'bg-info' },
    { width: '40%', color: 'bg-success' },
    { width: '50%', color: 'bg-primary' },
    { width: '60%', color: 'bg-info' },
    { width: '70%', color: 'bg-danger' },
    { width: '80%', color: 'bg-success' },
    { width: '90%', color: 'bg-info' },
    { width: '100%', color: 'bg-success' }
  ];

  const index = Math.min(Math.max(Math.floor(number / 10), 0), progress.length - 1);
  const { width, color } = progress[index];

  return new Handlebars.SafeString(`<div class="progress-bar ${color}" role="progressbar" style="width: ${width}" aria-valuenow="${number}" aria-valuemin="0" aria-valuemax="100"></div>`);
});



// Exportar Handlebars para usar en tu vista
module.exports = Handlebars;