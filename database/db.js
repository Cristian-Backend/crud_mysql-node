import mysql from "mysql2/promise";

async function conexionDB() {
    try {
        const conexion = await mysql.createConnection({
            host: 'localhost',
            database: 'usuariosCrudMysql',
            user: 'root',
            password: 'saionara123',
        });
        console.log('Conexión exitosa a la base de datos!');
        return conexion;  // Devuelve la conexión para ser usada en otras partes de la aplicación.
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        throw error;  // Relanza el error para manejarlo más arriba o fallar si es necesario.
    }
}

export default conexionDB;  // Exporta la función en lugar de ejecutarla.
