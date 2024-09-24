import conexionDB from "../database/db.js";

// Crear nuevo usuario
const saveUser = async (req, res) => {
  const { user, rol } = req.body;  
  try {
    const conexion = await conexionDB();  
    await conexion.query('INSERT INTO usuarios (user, rol) VALUES (?,?)', [user, rol]);  // Realizar la consulta
    
    // Redirigir a la página principal después de éxito
    res.redirect('/');  
  } catch (error) {
    console.error(error.message);
    
    // Redirigir a la página de inicio en caso de error
    res.redirect('/');
  }
};

const updateUser = async (req,res) => {
    // Implementar la actualización de un usuario
    const {id , user , rol} = req.body;
    try {
        const conexion = await conexionDB();  
        await conexion.query('UPDATE usuarios SET user=?, rol=? WHERE id=?', [user, rol, id]);  // Realizar la consulta
        
        // Redirigir a la página principal después de éxito
        res.redirect('/');
        
    } catch (error) {
        console.error(error.message);
        
        // Redirigir a la página de inicio en caso de error
        res.redirect('/');
        
    }


}






export { saveUser, 
    updateUser,
 };
