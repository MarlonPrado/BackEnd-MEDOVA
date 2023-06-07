
const requireLogin = (req, res, next) => {
    if (req.session.userId) {
      console.log(req.session.userId);
      // El usuario ha iniciado sesión
      next(); // Continuar con la siguiente función de middleware
    } else {
      // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
      req.flash('error', 'Debes iniciar sesión para acceder a esta página');
      res.redirect('/login');
    }
  };
  
  module.exports = requireLogin;
  