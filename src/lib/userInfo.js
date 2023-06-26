const pool = require('../db');

const getUserDataMiddleware = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const query = 'SELECT nombre, username, progreso, parametro, parametro2, parametro3, parametro4, parametro5  FROM usuario WHERE idUsuario = ?';
      const result = await pool.query(query, [req.session.userId]);
       {
        req.userData = {
          nombre: result[0].nombre,
          correo: result[0].username,
          progreso: result[0].progreso,
          parametro: result[0].parametro,
          parametro2: result[0].parametro2,
          parametro3: result[0].parametro3,
          parametro4: result[0].parametro4,
          parametro5: result[0].parametro5
        };
        
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
    
  }
  next();
};

module.exports = getUserDataMiddleware;
