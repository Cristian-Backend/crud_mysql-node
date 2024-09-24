import express from 'express';
import conexionDB from '../database/db.js';
import { saveUser, updateUser } from '../controllers/users.controllers.js';

const router = express.Router();

// Ruta principal para mostrar todos los usuarios
router.get('/', async (req, res) => {
    try {
        const conexion = await conexionDB();  // Conexión a la base de datos
        const [usuarios] = await conexion.query('SELECT * FROM usuarios');  // Realizar la consulta
        return res.render('index', { usuarios: usuarios });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Error en la petición');  
    } 
});

// Render de la vista para crear un nuevo usuario
router.get('/create', (req, res) => {
    res.render('create');
});

// Ruta para guardar un nuevo usuario
router.post('/save', saveUser);

// Ruta para editar un usuario
router.get('/edit/:id', async (req, res) => {    
    const id = req.params.id;
    try {
        const conexion = await conexionDB(); // Conexión a la base de datos
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id=?', [id]);
        
        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        
        res.render('edit', { user: results[0] }); // Cambié a 'edit' en lugar de 'edit.ejs'
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Error en la petición');  
    }
});

// Ruta para actualizar un usuario
router.post('/update', updateUser);


// Ruta para eliminar un usuario

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const conexion = await conexionDB(); // Conexión a la base de datos
        const [results] = await conexion.query('DELETE FROM usuarios WHERE id=?', [id]);

        // Redirigir a la lista de usuarios después de eliminar
        res.redirect('/'); // Cambié de renderizar a redirigir
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Error en la petición');  
    }
});

export default router;
