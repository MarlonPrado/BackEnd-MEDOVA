const pool = require('../db');

const getUserDataMiddleware = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const query = 'SELECT nombre, username FROM usuario WHERE idUsuario = ?';
      const result = await pool.query(query, [req.session.userId]);
      if (result.length > 0) {
        req.userData = {
          nombre: result[0].nombre,
          correo: result[0].username
        };
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }
  next();
};

module.exports = getUserDataMiddleware;
