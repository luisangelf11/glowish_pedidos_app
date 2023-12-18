import pool from '../database/database.js';
import {encryptPass} from '../auth/passwordEncrypt.js'

export const generateAdminUser = async()=>{
    try{
        const [adminExist] = await pool.query('SELECT * FROM Usuarios WHERE rol = ?', ['admin']);
        if(!adminExist.length) {
            const adminUser = {
                correo: "glowishfashion@admin.com",
                contrasena: await encryptPass('Admin123'),
                nombre: "Miguel Angel",
                apellido: "Fernandez",
                avatar: "",
                direccion: "La Vega, Rep. Dom",
                telefono: "829-369-3768",
                rol: "admin"
            };
            console.log(adminUser.contrasena)
            const [result] = await pool.query(`INSERT INTO Usuarios (correo, contrasena, nombre, apellido, avatar, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [adminUser.correo, adminUser.contrasena, adminUser.nombre, adminUser.apellido, adminUser.avatar, adminUser.direccion, adminUser.telefono, adminUser.rol]);
            console.log({
                result,
                message: 'User admin is already'
            });
        }else console.log('User admin is created') 
    }
    catch(err){
        console.log(err.message)
    }
}