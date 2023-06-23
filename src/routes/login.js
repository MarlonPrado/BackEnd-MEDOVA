const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');

// Renderiza el formulario de inicio de sesión
router.get('/login', (req, res) => {
  res.render('login');
});

// Procesa el formulario de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busca al usuario en la base de datos por su nombre de usuario
    const result = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
    const user = result[0];

    if (user) {
      // Compara la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos
      if (bcrypt.compareSync(password, user.password)) {
        // Inicio de sesión exitoso
        req.session.userId = user.idUsuario; // Establece el ID del usuario en la sesión
                res.redirect('/dashboard');
      } else {
        req.flash('error', 'La contraseña es incorrecta. ¿Olvidaste tu contraseña?');
        res.redirect('/login');
      }
    } else {
      req.flash('error', 'No se encontró ningún usuario con ese nombre de usuario');
      res.redirect('/login');
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'Ocurrió un error al iniciar sesión');
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al destruir la sesión:', err);
    }
    res.redirect('/login'); // Redireccionar a la página de inicio de sesión después de cerrar sesión
  });
});



module.exports = router;
