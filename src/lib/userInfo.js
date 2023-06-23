const pool = require('../db');

const getUserDataMiddleware = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const query = 'SELECT nombre, username, progreso  FROM usuario WHERE idUsuario = ?';
      const result = await pool.query(query, [req.session.userId]);
       {
        req.userData = {
          nombre: result[0].nombre,
          correo: result[0].username,
          progreso: result[0].progreso
        };
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
    
  }
  next();
};

module.exports = getUserDataMiddleware;
