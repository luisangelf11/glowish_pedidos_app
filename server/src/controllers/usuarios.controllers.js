import pool from "../database/database.js";
import { comparePass, encryptPass } from "../auth/passwordEncrypt.js";
import { generateToken } from '../auth/authentication.js'

//Get all users in the database
export const getUsuarios = async (req, res) => {
    try {
        const { limit, offset, correo } = req.query;
        if ((!limit && !offset) && !correo) {
            //Get all users if the query is not exist in the endpoint
            const [result] = await pool.query('SELECT * FROM Usuarios');
            if (!result.length) return res.status(404).json({ "message": "The table don't have data" });
            res.json(result);
        } else if ((limit && offset) && !correo) {
            //Allow use a pagination
            const [result] = await pool.query(`SELECT * FROM Usuarios ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);
            if (!result.length) return res.status(404).json({ "message": `The table don't have data (offset: ${offset})` });
            res.json(result);
        } else {
            //Filter with the correo
            let filter = `${correo}%`;
            const [result] = await pool.query(`SELECT * FROM Usuarios WHERE correo LIKE ? ORDER BY id DESC`, [filter]);
            /* if (!result.length) return res.status(404).json({ "message": `The user with email ${correo} is not found` }); */
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a user with params id
export const getUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
        if (!result.length) return res.status(404).json({ "message": `The Id ${id} is not found in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new user 
export const createUsuario = async (req, res) => {
    try {
        const { correo, contrasena, nombre, apellido, avatar, direccion, telefono, rol } = req.body;
        //Verify that the user is not exist in the db
        const [find] = await pool.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        if (find.length) return res.status(404).json({ "message": 'This E-mail is in use' });
        //if the email is not use: create a new account 
        let hash = await encryptPass(contrasena); //encrypt the password
        const [result] = await pool.query(`INSERT INTO Usuarios (correo, contrasena, nombre, apellido, avatar, direccion, telefono, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [correo, hash, nombre, apellido, avatar, direccion, telefono, rol]);
        //confirm that the user is save in the DB
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new user)" });
        res.json({
            id: result.insertId,
            correo,
            contrasena: hash,
            nombre,
            apellido,
            avatar,
            direccion,
            telefono,
            rol
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Update the data of a user with the params id
export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.query;
        if (!newPassword) {
            //Update others data
            const [result] = await pool.query(`UPDATE Usuarios SET ? WHERE id = ?`, [req.body, id]);
            if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a user with Id ${id})` });
            res.json(result);
        } else {
            //Update the password
            if (newPassword === "false") return res.status(404).json({ "message": "The query is in false" });
            const { contrasena } = req.body;
            let password = await encryptPass(contrasena);
            console.log(password)
            const [result] = await pool.query(`UPDATE Usuarios SET contrasena = ? WHERE id = ?`, [password, id]);
            if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update the password for the user with Id ${id})` });
            res.json({"newPass": password});
        }

    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a user with the params id
export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`DELETE FROM Usuarios WHERE id = ?`, [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a user with Id ${id})` });
        res.json({ "message": `User with Id ${id} was delete` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Sign in with the user
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.query;
        if (email && password) {
            //Find the user with her email
            const [result] = await pool.query('SELECT * FROM Usuarios WHERE correo = ?', [email]);
            if (!result.length) return res.status(404).json({ "message": "E-mail or password is incorrect" });
            //Compare passwords (true or false)
            let signIn = await comparePass(password, result[0].Contrasena);
            if (signIn) {
                //Create a new token for de new session
                const token = generateToken(result[0]);
                const {Id, Correo, Nombre, Apellido, Rol, Avatar, Telefono, Direccion} = result[0];
                const user = { Id, Correo, Nombre, Apellido, Rol, Avatar, Direccion, Telefono,Token: token }
                res.json(user);
            } else res.status(404).json({ "message": "E-mail or password is incorrect" });
        } else res.status(404).json({ "message": "The endpoint need a query for sign in" });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}