import pool from '../database/database.js';

//Get all comments of the table
export const getComentarios = async (req, res) => {
    try {
        const { id_producto, limit, offset } = req.query;
        if (id_producto && limit && offset) {
            //Select all comments where the id_producto is the params query
            const [result] = await pool.query(`SELECT * FROM Comentarios WHERE id_producto = ? ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`, [id_producto]);
            /* if (!result.length) return res.status(404).json({ "message": `Don't exist comments for the product with id ${id_producto}` }); */
            res.json(result);
        } else {
            //Select all comments in the table
            const [result] = await pool.query(`SELECT * FROM Comentarios ORDER BY id DESC LIMIT 10 OFFSET 0`);
            if (!result.length) return res.status(404).json({ "message": `This table dont have data` });
            res.json(result);
        }
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Get a comment with the id
export const getComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`SELECT * FROM Comentarios WHERE Id = ?`, [id]);
        if (!result.length) return res.status(404).json({ "message": `The comment with id ${id} is not exist in the table` });
        res.json(result[0]);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Create a new comment for a product
export const createComentario = async (req, res) => {
    try {
        const { comentario, fecha, id_producto, id_usuario } = req.body;
        const [result] = await pool.query(`INSERT INTO Comentarios (comentario, fecha, id_producto, id_usuario) VALUES (?, ?, ?, ?)`, [comentario, fecha, id_producto, id_usuario]);
        if (!result.affectedRows) return res.status(404).json({ "message": "Error in the query (create a new comment)" });
        res.json({
            id: result.insertId,
            comentario,
            fecha,
            id_producto,
            id_usuario
        });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Upload the data of a comment with the params id
export const uploadComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`UPDATE Comentarios SET ? WHERE id = ?`, [req.body, id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (update a cooment with Id ${id})` });
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

//Delete a comments with the params id
export const deleteComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`DELETE FROM Comentarios WHERE Id = ?`, [id]);
        if (!result.affectedRows) return res.status(404).json({ "message": `Error in the query (delete a comment with Id ${id})` });
        res.json({ "message": `Comment with Id ${id} was deleted` });
    }
    catch (err) {
        res.status(500).json({ "message": err.message });
    }
}