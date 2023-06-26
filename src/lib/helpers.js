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
  console.log(array);
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


Handlebars.registerHelper('navbarOptions', function(options) {
  const { progress, unit } = options.hash;
  let html = '<ul>';

  for (let i = 1; i <= 5; i++) {
    if (progress >= (i - 1) * 20) {
      if (i === unit) {
        html += `<li><a href="/unidad${i}eva">Evaluacion Unidad ${i}</a></li>`;
      } else if (i < unit) {
        html += `<li>Unidad ${i} completada</li>`;
      } else {
        html += `<li>Bloqueado unidad ${i}</li>`;
        break;
      }
    } else {
      html += `<li>Bloqueado unidad ${i}</li>`;
      break;
    }
  }

  html += '</ul>';

  return new Handlebars.SafeString(html);
});


Handlebars.registerHelper('estadoBadge', function(parametro) {
  if (parametro === 1) {
    return new Handlebars.SafeString('<span class="badge badge-success badge-xs ms-1">Completado</span>');
  } else {
    return new Handlebars.SafeString('<span class="badge badge-danger badge-xs ms-1">Completa Eva 1</span>');
  }
});


Handlebars.registerHelper('estadoBadge2', function(parametro2) {
  if (parametro2 === 1) {
    return new Handlebars.SafeString('<span class="badge badge-success badge-xs ms-1">Completado</span>');
  } else {
    return new Handlebars.SafeString('<span class="badge badge-danger badge-xs ms-1">Completa Eva 2</span>');
  }
});

Handlebars.registerHelper('estadoBadge3', function(parametro3) {
  if (parametro3 === 1) {
    return new Handlebars.SafeString('<span class="badge badge-success badge-xs ms-1">Completado</span>');
  } else {
    return new Handlebars.SafeString('<span class="badge badge-danger badge-xs ms-1">Completa Eva 3</span>');
  }
});

Handlebars.registerHelper('estadoBadge4', function(parametro4) {
  if (parametro4 === 1) {
    return new Handlebars.SafeString('<span class="badge badge-success badge-xs ms-1">Completado</span>');
  } else {
    return new Handlebars.SafeString('<span class="badge badge-danger badge-xs ms-1">Completa Eva 4</span>');
  }
});

Handlebars.registerHelper('estadoBadge5', function(parametro5) {
  if (parametro5 === 1) {
    return new Handlebars.SafeString('<span class="badge badge-success badge-xs ms-1">Completado</span>');
  } else {
    return new Handlebars.SafeString('<span class="badge badge-danger badge-xs ms-1">Completa Eva 5</span>');
  }
});



// Exportar Handlebars para usar en tu vista
module.exports = Handlebars;